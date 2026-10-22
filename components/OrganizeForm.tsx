"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { fieldErrors, organizeStep1, organizeStep2, organizeStep3 } from "@/lib/forms";
import { Checkbox, Honeypot, SelectField, TextArea, TextField } from "./Field";
import { ArrowRight } from "./Icons";
import { Turnstile } from "./Turnstile";

type Option = { slug: string; name: string };

const STEPS = ["Chi sei", "Come ti contattiamo", "Dove"] as const;
const SCHEMAS = [organizeStep1, organizeStep2, organizeStep3] as const;

const EMPTY = {
  nome: "",
  cognome: "",
  email: "",
  telefono: "",
  citta: "",
  altraCitta: "",
  ruolo: "" as "" | "referente" | "nuova-citta",
  esperienza: "",
  privacy: false,
  pubblicazione: false,
};

export function OrganizeForm({ cities }: { cities: Option[] }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const [doneName, setDoneName] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onToken = useCallback((t: string) => setToken(t), []);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("citta");
    if (slug && cities.some((c) => c.slug === slug)) setData((d) => ({ ...d, citta: slug }));
  }, [cities]);

  const set = <K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) => setData((d) => ({ ...d, [key]: value }));

  function validate(i: number) {
    const res = SCHEMAS[i].safeParse({ ...data, ruolo: data.ruolo || undefined });
    if (res.success) {
      setErrors({});
      return true;
    }
    setErrors(fieldErrors(res.error));
    return false;
  }

  function goTo(i: number) {
    setStep(i);
    // Sposta il focus sul titolo dello step: chi usa uno screen reader sente dove si trova.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (step < STEPS.length - 1) {
      if (validate(step)) goTo(step + 1);
      return;
    }
    if (!validate(step)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/referenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, altraCitta: data.citta === "altra" ? data.altraCitta : undefined, sito: honeypot, turnstile: token }),
      });
      const body = (await res.json()) as { ok?: boolean; nome?: string; error?: string; errors?: Record<string, string> };
      if (!res.ok) {
        if (body.errors) {
          setErrors(body.errors);
          const first = Object.keys(body.errors)[0];
          const back = ["nome", "cognome"].includes(first) ? 0 : ["email", "telefono"].includes(first) ? 1 : 2;
          if (back !== step) goTo(back);
        }
        setFormError(body.error ?? "Controlla i campi evidenziati.");
        setStatus("idle");
        return;
      }
      setDoneName(body.nome ?? data.nome);
      setStatus("done");
    } catch {
      setFormError("Connessione non riuscita. Riprova tra poco.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="card text-center" role="status">
        <p className="font-display text-3xl font-bold">Grazie {doneName}!</p>
        <p className="mt-3 text-blu-2">Ti abbiamo scritto una mail. Nox e Marco ti contatteranno a breve.</p>
        {data.citta !== "altra" && (
          <p className="mt-2 text-sm text-blu-2">Il tuo nome comparirà tra i referenti della città entro pochi minuti.</p>
        )}
        <Link href="/" className="btn-secondary mt-6">
          Torna alla home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card relative">
      <ol className="flex gap-2" aria-label="Avanzamento">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <span className={`block h-1.5 rounded-full ${i <= step ? "bg-fuxia-forte" : "bg-filo"}`} />
            <span className={`mt-2 hidden text-xs font-semibold sm:block ${i === step ? "text-blu" : "text-blu-2"}`}>{label}</span>
          </li>
        ))}
      </ol>

      <h3 ref={headingRef} tabIndex={-1} className="mt-6 text-2xl font-bold outline-none">
        <span className="block text-sm font-semibold text-azzurro-forte">
          Step {step + 1} di {STEPS.length}
        </span>
        {STEPS[step]}
      </h3>

      <div className="mt-6 space-y-5">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Nome" name="nome" required autoComplete="given-name" value={data.nome} onChange={(e) => set("nome", e.target.value)} error={errors.nome} />
            <TextField label="Cognome" name="cognome" required autoComplete="family-name" value={data.cognome} onChange={(e) => set("cognome", e.target.value)} error={errors.cognome} />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" value={data.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
            <TextField
              label="Telefono"
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+39 333 123 4567"
              value={data.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              error={errors.telefono}
            />
            <p className="text-sm text-blu-2 sm:col-span-2">Email e telefono li vedono solo Nox e Marco. Non compaiono mai sul sito.</p>
          </div>
        )}

        {step === 2 && (
          <>
            <SelectField label="Città in cui organizzi lo SW" name="citta" required value={data.citta} onChange={(e) => set("citta", e.target.value)} error={errors.citta}>
              <option value="">Scegli una città</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
              <option value="altra">Un&apos;altra città</option>
            </SelectField>
            {data.citta === "altra" && (
              <TextField label="Quale città?" name="altraCitta" required value={data.altraCitta} onChange={(e) => set("altraCitta", e.target.value)} error={errors.altraCitta} />
            )}
            <fieldset>
              <legend className="field-label">
                Il tuo ruolo<span aria-hidden className="text-fuxia-forte"> *</span>
              </legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["referente", "Faccio già parte del team di una città"],
                    ["nuova-citta", "Voglio aprire uno SW in una nuova città"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className={`flex cursor-pointer gap-3 rounded-xl border p-4 text-sm ${data.ruolo === value ? "border-fuxia-forte bg-fuxia-tenue" : "border-filo-forte"}`}>
                    <input type="radio" name="ruolo" value={value} checked={data.ruolo === value} onChange={() => set("ruolo", value)} className="mt-0.5 accent-fuxia-forte" />
                    {label}
                  </label>
                ))}
              </div>
              {errors.ruolo && <p className="field-error">{errors.ruolo}</p>}
            </fieldset>
            <TextArea
              label="Raccontaci qualcosa di te (facoltativo)"
              name="esperienza"
              hint="Esperienze con eventi, community o startup, e perché vuoi organizzare uno SW."
              value={data.esperienza}
              onChange={(e) => set("esperienza", e.target.value)}
              error={errors.esperienza}
            />
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
            <Checkbox
              name="pubblicazione"
              checked={data.pubblicazione}
              onChange={(v) => set("pubblicazione", v)}
              error={errors.pubblicazione}
              label="Acconsento a mostrare solo il mio nome e cognome sul sito, tra i referenti della città. *"
            />
            <Turnstile onToken={onToken} />
          </>
        )}
      </div>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      {formError && (
        <p role="alert" className="field-error mt-6">
          {formError}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => goTo(step - 1)} className="btn-secondary">
            Indietro
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {step < STEPS.length - 1 ? "Avanti" : status === "sending" ? "Invio in corso…" : "Invia"} <ArrowRight />
        </button>
      </div>
    </form>
  );
}
