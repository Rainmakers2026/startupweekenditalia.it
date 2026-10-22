"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CONTACT_REASONS, contactSchema, fieldErrors } from "@/lib/forms";
import { Checkbox, Honeypot, SelectField, TextArea, TextField } from "./Field";
import { ArrowRight } from "./Icons";
import { Turnstile } from "./Turnstile";

// Scorciatoie da URL: /contatti?motivo=scuola&citta=rimini
const REASON_FROM_QUERY: Record<string, (typeof CONTACT_REASONS)[number]> = {
  segnala: CONTACT_REASONS[0],
  apri: CONTACT_REASONS[1],
  scuola: CONTACT_REASONS[2],
  partner: CONTACT_REASONS[3],
  media: CONTACT_REASONS[4],
};

export function ContactForm({ cities }: { cities: { slug: string; name: string }[] }) {
  const [data, setData] = useState({ nome: "", email: "", citta: "", motivo: "", messaggio: "", privacy: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const city = cities.find((c) => c.slug === q.get("citta"))?.name;
    const motivo = REASON_FROM_QUERY[q.get("motivo") ?? ""];
    setData((d) => ({ ...d, citta: city ?? d.citta, motivo: motivo ?? d.motivo }));
  }, [cities]);

  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => setData((d) => ({ ...d, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const res = contactSchema.safeParse(data);
    if (!res.success) {
      setErrors(fieldErrors(res.error));
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const r = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...res.data, sito: honeypot, turnstile: token }),
      });
      const body = (await r.json()) as { error?: string; errors?: Record<string, string> };
      if (!r.ok) {
        if (body.errors) setErrors(body.errors);
        setFormError(body.error ?? "Controlla i campi evidenziati.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setFormError("Connessione non riuscita. Riprova tra poco.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="card text-center" role="status">
        <p className="font-display text-3xl font-bold">Messaggio inviato!</p>
        <p className="mt-3 text-blu-2">Grazie {data.nome}, ti rispondiamo il prima possibile.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome" name="nome" required autoComplete="name" value={data.nome} onChange={(e) => set("nome", e.target.value)} error={errors.nome} />
        <TextField label="Email" name="email" type="email" required autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Motivo" name="motivo" required value={data.motivo} onChange={(e) => set("motivo", e.target.value)} error={errors.motivo}>
          <option value="">Scegli un motivo</option>
          {CONTACT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectField>
        <TextField label="Città" name="citta" list="contatti-citta" autoComplete="address-level2" value={data.citta} onChange={(e) => set("citta", e.target.value)} error={errors.citta} />
        <datalist id="contatti-citta">
          {cities.map((c) => (
            <option key={c.slug} value={c.name} />
          ))}
        </datalist>
      </div>
      {data.motivo === CONTACT_REASONS[1] && (
        <p className="rounded-xl bg-fuxia-tenue p-4 text-sm">
          Vuoi aprire uno SW? Usa il{" "}
          <Link href="/organizza" className="link">
            form dedicato in 3 step
          </Link>
          : arriva direttamente a Nox e Marco.
        </p>
      )}
      <TextArea label="Messaggio" name="messaggio" required value={data.messaggio} onChange={(e) => set("messaggio", e.target.value)} error={errors.messaggio} />
      <Checkbox
        name="privacy"
        checked={data.privacy}
        onChange={(v) => set("privacy", v)}
        error={errors.privacy}
        label={
          <>
            Ho letto l&apos;
            <Link href="/privacy" className="link" target="_blank">
              informativa privacy
            </Link>{" "}
            e acconsento al trattamento dei miei dati. *
          </>
        }
      />
      <Turnstile onToken={onToken} />
      <Honeypot value={honeypot} onChange={setHoneypot} />
      {formError && (
        <p role="alert" className="field-error">
          {formError}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Invio in corso…" : "Invia messaggio"} <ArrowRight />
      </button>
    </form>
  );
}
