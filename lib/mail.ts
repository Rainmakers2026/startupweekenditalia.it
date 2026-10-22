import "server-only";

type Mail = { to: string[]; subject: string; text: string; replyTo?: string };

/** Invia tramite Resend. Se la chiave manca registra l'email nei log, così i form funzionano anche in sviluppo. */
export async function sendMail({ to, subject, text, replyTo }: Mail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? "noreply@startupweekenditalia.it";
  if (!key) {
    console.info(`[mail non inviata: RESEND_API_KEY mancante] a ${to.join(", ")} — ${subject}\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: `Startup Weekend Italia <${from}>`, to, subject, text, reply_to: replyTo }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export function teamRecipients(): string[] {
  return [process.env.MAIL_TO_NOX, process.env.MAIL_TO_MARCO].filter((v): v is string => Boolean(v));
}
