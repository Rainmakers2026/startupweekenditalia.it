import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ: domande frequenti",
  description:
    "Cos'è uno Startup Weekend, quanto costa, chi può partecipare e come si organizza: le risposte alle domande più frequenti.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const groups = [
    { id: "partecipanti", title: "Per chi vuole partecipare", items: faqs.filter((f) => f.audience === "partecipanti") },
    { id: "organizzatori", title: "Per chi organizza", items: faqs.filter((f) => f.audience === "organizzatori") },
  ];
  return (
    <>
      <PageHero eyebrow="FAQ" title="Domande frequenti" lead="Non trovi la risposta che cerchi?">
        <p className="mt-4">
          <Link href="/contatti" className="font-semibold text-white underline underline-offset-4">
            Scrivici
          </Link>
        </p>
      </PageHero>
      {groups.map((g, i) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-titolo`} className={`section ${i % 2 ? "bg-superficie" : ""}`}>
          <div className="container-sw">
            <h2 id={`${g.id}-titolo`} className="h2">
              {g.title}
            </h2>
            <FaqList items={g.items} />
          </div>
        </section>
      ))}
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
