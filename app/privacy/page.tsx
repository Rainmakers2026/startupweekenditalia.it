import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Informativa privacy", robots: { index: false }, alternates: { canonical: "/privacy" } };

// TODO: testo legale da fornire (titolare del trattamento, finalità, basi giuridiche, conservazione, diritti).
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legale" title="Informativa privacy" />
      <section className="section">
        <div className="container-sw max-w-3xl space-y-4 text-blu-2">
          <p>
            <strong className="text-blu">Titolare del trattamento:</strong> Lorem ipsum.
          </p>
          <p>
            <strong className="text-blu">Dati raccolti dai form:</strong> nome, cognome, email, telefono e città. Email e telefono sono visibili solo al
            team organizzativo e non vengono mai pubblicati. Nome e cognome dei referenti sono pubblicati sul sito solo con consenso esplicito.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>
    </>
  );
}
