import { createRecord } from "@/lib/airtable";
import { contactSchema, fieldErrors } from "@/lib/forms";
import { clientIp, rateLimited, verifyTurnstile } from "@/lib/guard";
import { sendMail, teamRecipients } from "@/lib/mail";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Richiesta non valida" }, { status: 400 });
  if (body.sito) return Response.json({ ok: true });

  const ip = clientIp(req);
  if (rateLimited(ip)) return Response.json({ error: "Troppi invii. Riprova tra un'ora." }, { status: 429 });
  if (!(await verifyTurnstile(body.turnstile as string | undefined, ip))) {
    return Response.json({ error: "Verifica antispam non superata. Ricarica la pagina e riprova." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return Response.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  const d = parsed.data;

  const saved = await createRecord(process.env.AIRTABLE_TABLE_CONTATTI ?? "Contatti", {
    Nome: d.nome,
    Email: d.email,
    "Città": d.citta ?? "",
    Motivo: d.motivo,
    Messaggio: d.messaggio,
  }).then(
    () => true,
    (err) => (console.error(err), false),
  );

  const mailed = await sendMail({
    to: teamRecipients(),
    replyTo: d.email,
    subject: `[Contatto sito] ${d.motivo}${d.citta ? ` — ${d.citta}` : ""}`,
    text: `Da: ${d.nome} <${d.email}>\nCittà: ${d.citta || "-"}\nMotivo: ${d.motivo}\n\n${d.messaggio}`,
  }).then(
    () => true,
    (err) => (console.error(err), false),
  );

  if (!saved && !mailed) {
    return Response.json({ error: "Non siamo riusciti a inviare il messaggio. Riprova tra poco." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
