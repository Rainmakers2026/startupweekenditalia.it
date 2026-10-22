import type { Metadata } from "next";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { OrganizeForm } from "@/components/OrganizeForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { cities, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Apri uno Startup Weekend nella tua città",
  description:
    "Vuoi portare Startup Weekend nella tua città o entrare nel team di una città esistente? Compila il form in 3 step: ti contattiamo noi.",
  alternates: { canonical: "/organizza" },
};

const OFFER = [
  ["Affiancamento", "Chi ha già organizzato ti segue nei primi passi: dalla richiesta a Techstars al giorno dell'evento."],
  ["Esperienza condivisa", "Checklist, consigli e soluzioni dalle altre città italiane: non parti da zero."],
  ["Visibilità", "La tua città sulla mappa nazionale e il rilancio del tuo SW sui canali e sui media partner del network."],
];

export default function OrganizePage() {
  const orgFaqs = faqs.filter((f) => f.audience === "organizzatori");
  return (
    <>
      <PageHero
        eyebrow="Organizza"
        title="Nella tua città non c'è uno Startup Weekend? Aprilo tu."
        lead="Uno SW lo organizza un piccolo team di volontari, con un facilitatore e il supporto di partner locali. Noi ti aiutiamo a partire."
      />
      <section className="section" aria-labelledby="cosa-offriamo">
        <div className="container-sw grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading id="cosa-offriamo" eyebrow="Cosa trovi" title="Non sei da solo" />
            <ul className="mt-8 space-y-6">
              {OFFER.map(([title, text]) => (
                <li key={title} className="border-l-4 border-fuxia-forte pl-4">
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-blu-2">{text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-blu-2">
              Fai già parte del team di una città? Compila il form lo stesso: il tuo nome comparirà tra i referenti della città.
            </p>
          </div>
          <div>
            <h2 className="sr-only">Form di candidatura</h2>
            <OrganizeForm cities={cities.map((c) => ({ slug: c.slug, name: c.name }))} />
          </div>
        </div>
      </section>
      <section className="section bg-superficie" aria-labelledby="faq-org">
        <div className="container-sw">
          <SectionHeading id="faq-org" eyebrow="FAQ" title="Domande da organizzatori" />
          <FaqList items={orgFaqs} />
        </div>
      </section>
      <JsonLd data={faqJsonLd(orgFaqs)} />
    </>
  );
}
