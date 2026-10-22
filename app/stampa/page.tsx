import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MediaPartners, PressList } from "@/components/Press";
import { SectionHeading } from "@/components/SectionHeading";
import { mediaPartners, press, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rassegna stampa e media partner",
  description: "Cosa dicono di Startup Weekend Italia: articoli, media partner e press kit per giornalisti.",
  alternates: { canonical: "/stampa" },
};

export default function PressPage() {
  return (
    <>
      <PageHero eyebrow="Stampa" title="Dicono di noi" lead="Articoli, media partner e materiali per chi racconta gli Startup Weekend italiani.">
        <div className="mt-8 flex flex-wrap gap-3">
          {site.pressKitUrl ? (
            <a href={site.pressKitUrl} className="btn-primary">
              Scarica il press kit
            </a>
          ) : (
            <span className="btn border-2 border-white/30 text-bianco-2">Press kit in arrivo</span>
          )}
          <Link href="/contatti?motivo=media" className="btn-secondary">
            Contatti stampa
          </Link>
        </div>
      </PageHero>
      <section className="section" aria-labelledby="rassegna">
        <div className="container-sw">
          <SectionHeading id="rassegna" eyebrow="Rassegna stampa" title="Gli articoli" />
          <PressList items={press} />
        </div>
      </section>
      <section className="section bg-superficie" aria-labelledby="partner">
        <div className="container-sw">
          <SectionHeading id="partner" eyebrow="Media partner" title="Chi rilancia i nostri SW" />
          <MediaPartners items={mediaPartners} />
        </div>
      </section>
    </>
  );
}
