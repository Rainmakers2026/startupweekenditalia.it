import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Cookie", robots: { index: false }, alternates: { canonical: "/cookie" } };

export default function CookiePage() {
  return (
    <>
      <PageHero eyebrow="Legale" title="Cookie" />
      <section className="section">
        <div className="container-sw max-w-3xl space-y-4 text-blu-2">
          <p>Questo sito non usa cookie di profilazione. Le statistiche di visita sono raccolte in forma anonima, senza cookie.</p>
          <p>
            Il calendario Google e la verifica antispam (Cloudflare Turnstile) sono servizi di terze parti. Il calendario si carica solo se clicchi
            &quot;Mostra il calendario&quot;.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>
    </>
  );
}
