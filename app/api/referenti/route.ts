import { revalidateTag } from "next/cache";
import { createRecord, REFERENTI_TAG } from "@/lib/airtable";
import { getCity } from "@/lib/content";
import { fieldErrors, organizeSchema } from "@/lib/forms";
import { clientIp, rateLimited, verifyTurnstile } from "@/lib/guard";
import { sendMail, teamRecipients } from "@/lib/mail";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Richiesta non valida" }, { status: 400 });

  // Honeypot: i bot compilano anche i campi nascosti.
  if (body.sito) return Response.json({ ok: true });

  const ip = clientIp(req);
  if (rateLimited(ip)) return Response.json({ error: "Troppi invii. Riprova tra un'ora." }, { status: 429 });
  if (!(await verifyTurnstile(body.turnstile as string | undefined, ip))) {
    return Response.json({ error: "Verifica antispam non superata. Ricarica la pagina e riprova." }, { status: 400 });
  }

  const parsed = organizeSchema.safeParse(body);
  if (!parsed.success) return Response.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  const d = parsed.data;

  const city = d.citta === "altra" ? undefined : getCity(d.citta);
  if (d.citta !== "altra" && !city) return Response.json({ errors: { citta: "Città non valida" } }, { status: 422 });
  const cityLabel = city?.name ?? d.altraCitta ?? "";

  try {
    await createRecord(process.env.AIRTABLE_TABLE_REFERENTI ?? "Referenti", {
      Nome: d.nome,
      Cognome: d.cognome,
      Email: d.email,
      Telefono: d.telefono,
      "Città": city ? city.slug : "altra",
      "Altra città": d.altraCitta ?? "",
      Ruolo: d.ruolo === "referente" ? "Referente attivo" : "Vuole aprire uno SW",
      Esperienza: d.esperienza ?? "",
      "Consenso pubblicazione nome": true,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Non siamo riusciti a salvare i dati. Riprova tra poco." }, { status: 502 });
  }

  // Le notifiche non devono far fallire un'iscrizione già salvata.
  await Promise.allSettled([
    sendMail({
      to: teamRecipients(),
      replyTo: d.email,
      subject: `Nuovo referente SW: ${d.nome} ${d.cognome} (${cityLabel})`,
      text: [
        `Nome: ${d.nome} ${d.cognome}`,
        `Email: ${d.email}`,
        `Telefono: ${d.telefono}`,
        `Città: ${cityLabel}`,
        `Ruolo: ${d.ruolo === "referente" ? "Fa già parte del team della città" : "Vuole aprire uno SW in una nuova città"}`,
        `Esperienza / motivazione: ${d.esperienza || "-"}`,
      ].join("\n"),
    }),
    sendMail({
      to: [d.email],
      subject: "Grazie! Abbiamo ricevuto la tua richiesta",
      text: `Ciao ${d.nome},\n\ngrazie per voler portare Startup Weekend a ${cityLabel}. Nox e Marco ti contatteranno a breve.\n\nIl team di Startup Weekend Italia`,
    }),
  ]);

  revalidateTag(REFERENTI_TAG, { expire: 0 });
  return Response.json({ ok: true, nome: d.nome });
}
