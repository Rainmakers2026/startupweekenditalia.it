import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { cities, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contatti e segnalazioni",
  description:
    "Segnalaci uno Startup Weekend, proponi una partnership o contattaci per la stampa. Ti rispondiamo il prima possibile.",
  alternates: { canonical: "/contatti" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Scrivici"
        lead="Hai visto uno Startup Weekend che non è sul sito? Vuoi diventare partner? Sei una scuola interessata a Rimini Youth? Raccontaci."
      />
      <section className="section">
        <div className="container-sw grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm cities={cities.map((c) => ({ slug: c.slug, name: c.name }))} />
          <aside className="space-y-4 text-blu-2">
            <h2 className="font-display text-xl font-bold text-blu">Preferisci la mail?</h2>
            <p>
              {/* TODO: email reale */}
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
