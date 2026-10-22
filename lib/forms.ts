import { z } from "zod";

// Messaggi di errore generici di zod in italiano (quelli specifici sono scritti sotto).
z.config(z.locales.it());

const required = (label: string) =>
  z
    .string({ error: `${label}: campo obbligatorio` })
    .trim()
    .min(1, `${label}: campo obbligatorio`);

export const organizeStep1 = z.object({
  nome: required("Nome").max(60),
  cognome: required("Cognome").max(60),
});

export const organizeStep2 = z.object({
  email: z.string({ error: "Inserisci un'email valida" }).trim().email("Inserisci un'email valida"),
  telefono: z
    .string({ error: "Inserisci un numero di telefono valido" })
    .trim()
    .regex(/^\+?[0-9 ()./-]{6,20}$/, "Inserisci un numero di telefono valido"),
});

export const organizeStep3 = z
  .object({
    citta: required("Città"),
    altraCitta: z.string().trim().max(80).optional(),
    ruolo: z.enum(["referente", "nuova-citta"], { message: "Scegli un'opzione" }),
    esperienza: z.string().trim().max(2000).optional(),
    privacy: z.literal(true, { message: "Devi accettare l'informativa privacy" }),
    pubblicazione: z.literal(true, { message: "Serve il consenso per mostrare nome e cognome" }),
  })
  .refine((d) => d.citta !== "altra" || (d.altraCitta && d.altraCitta.length > 1), {
    message: "Scrivi il nome della tua città",
    path: ["altraCitta"],
  });

export const organizeSchema = z.intersection(z.intersection(organizeStep1, organizeStep2), organizeStep3);
export type OrganizeInput = z.infer<typeof organizeSchema>;

export const CONTACT_REASONS = [
  "Segnalo uno Startup Weekend che non vedo sul sito",
  "Sono disponibile ad aprirne uno",
  "Sono una scuola interessata (Rimini Youth)",
  "Partnership / sponsorizzazione",
  "Media / stampa",
  "Altro",
] as const;

export const contactSchema = z.object({
  nome: required("Nome").max(80),
  email: z.string().trim().email("Inserisci un'email valida"),
  citta: z.string().trim().max(80).optional(),
  motivo: z.enum(CONTACT_REASONS, { message: "Scegli un motivo" }),
  messaggio: required("Messaggio").max(4000),
  privacy: z.literal(true, { message: "Devi accettare l'informativa privacy" }),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** Mappa gli errori zod in { campo: messaggio } per i form. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
