import "server-only";
import { cities } from "./content";

const API = "https://api.airtable.com/v0";
export const REFERENTI_TAG = "referenti";

function config() {
  const token = process.env.AIRTABLE_API_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID;
  if (!token || !base) return null;
  return { token, base };
}

function tableUrl(base: string, table: string) {
  return `${API}/${base}/${encodeURIComponent(table)}`;
}

type ReferenteRecord = { fields: { Nome?: string; Cognome?: string; "Città"?: string } };

/**
 * Nomi pubblici dei referenti, raggruppati per slug città.
 * Chiede ad Airtable solo Nome, Cognome e Città: email e telefono non lasciano mai Airtable.
 * Se Airtable non è configurato o non risponde, restano i referenti statici di cities.json.
 */
export async function getReferenti(): Promise<Record<string, string[]>> {
  const result: Record<string, string[]> = {};
  for (const c of cities) result[c.slug] = [...c.referentiStatic];

  const cfg = config();
  if (cfg) {
    try {
      const table = process.env.AIRTABLE_TABLE_REFERENTI ?? "Referenti";
      let offset: string | undefined;
      do {
        const params = new URLSearchParams({ filterByFormula: "{Visibile sul sito}", pageSize: "100" });
        for (const f of ["Nome", "Cognome", "Città"]) params.append("fields[]", f);
        if (offset) params.set("offset", offset);
        const res = await fetch(`${tableUrl(cfg.base, table)}?${params}`, {
          headers: { Authorization: `Bearer ${cfg.token}` },
          next: { revalidate: 300, tags: [REFERENTI_TAG] },
        });
        if (!res.ok) throw new Error(`Airtable ${res.status}`);
        const data = (await res.json()) as { records: ReferenteRecord[]; offset?: string };
        for (const r of data.records) {
          const slug = r.fields["Città"];
          const name = [r.fields.Nome, r.fields.Cognome].filter(Boolean).join(" ").trim();
          if (slug && name && result[slug]) result[slug].push(name);
        }
        offset = data.offset;
      } while (offset);
    } catch (err) {
      console.error("Lettura referenti da Airtable non riuscita:", err);
    }
  }

  for (const slug of Object.keys(result)) {
    const seen = new Set<string>();
    result[slug] = result[slug]
      .filter((n) => {
        const key = n.toLocaleLowerCase("it");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => a.localeCompare(b, "it"));
  }
  return result;
}

export async function createRecord(table: string, fields: Record<string, unknown>): Promise<void> {
  const cfg = config();
  if (!cfg) throw new Error("Airtable non configurato");
  const res = await fetch(tableUrl(cfg.base, table), {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`);
}
