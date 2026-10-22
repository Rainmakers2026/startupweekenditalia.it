import Link from "next/link";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { CalendarLinks } from "@/components/CalendarLinks";
import { CityGrid } from "@/components/CityGrid";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ArrowRight } from "@/components/Icons";
import { ItalyMap } from "@/components/ItalyMap";
import { JsonLd } from "@/components/JsonLd";
import { Newsletter } from "@/components/Newsletter";
import { PhotoGallery } from "@/components/PhotoGallery";
import { MediaPartners, PressList } from "@/components/Press";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { StartupList } from "@/components/StartupList";
import { UpcomingTable } from "@/components/UpcomingTable";
import { getReferenti } from "@/lib/airtable";
import { cities, faqs, mediaPartners, photos, press, site, social, startups } from "@/lib/content";
import { sortByNextDate } from "@/lib/dates";
import { eventJsonLd } from "@/lib/events";
import { spreadPins, toView } from "@/lib/view";

export const revalidate = 300;

export default async function Home() {
  const referenti = await getReferenti();
  const views = cities.map((c) => toView(c, referenti));
  const byDate = sortByNextDate(cities).map((c) => toView(c, referenti));
  const homeFaqs = faqs.filter((f) => f.audience === "partecipanti").slice(0, 5);
  const cityOptions = cities.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <>
      <Hero cityCount={cities.length} />

      <section id="mappa" aria-labelledby="mappa-titolo" className="section">
        <div className="container-sw">
          <SectionHeading
            id="mappa-titolo"
            eyebrow="Le città"
            title="Dove si fa il prossimo Startup Weekend?"
            lead="Tocca una città sulla mappa: trovi date, referenti e come partecipare."
          />
          <div className="mt-10">
            <ItalyMap cities={spreadPins(views)} />
          </div>
        </div>
      </section>

      <section id="date" aria-labelledby="date-titolo" className="section bg-superficie">
        <div className="container-sw">
          <SectionHeading id="date-titolo" eyebrow="Calendario" title="Prossimi Startup Weekend" lead="Tutte le date in un colpo d'occhio. Le nuove edizioni compaiono qui appena vengono confermate." />
          <UpcomingTable cities={byDate} />
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold">Vuoi girare l&apos;Italia a colpi di Startup Weekend?</h3>
              <p className="mt-3 text-blu-2">Aggiungi il calendario condiviso e non perdi nessuna data. Si aggiorna da solo.</p>
              <CalendarLinks />
            </div>
            <CalendarEmbed />
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="citta" aria-labelledby="citta-titolo" className="section">
        <div className="container-sw">
          <SectionHeading id="citta-titolo" eyebrow="Tutte le città" title={`${cities.length} città, una sola community`} lead="Ogni Startup Weekend è organizzato da volontari della sua città. Ecco chi sono e dove trovarli." />
          <CityGrid cities={views} />
        </div>
      </section>

      <section aria-labelledby="organizza-titolo" className="section on-dark bg-azzurro-forte text-white">
        <div className="container-sw grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wider text-white/90 uppercase">Organizza</p>
            <h2 id="organizza-titolo" className="h2">
              Nella tua città non c&apos;è uno Startup Weekend? Aprilo tu.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Non serve essere esperti: servono un piccolo team di persone in gamba e la voglia di far crescere la community. Al resto ti aiutiamo noi, con l&apos;esperienza delle altre città.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/organizza" className="btn bg-white text-blu hover:bg-superficie-alt">
              Apri uno SW nella tua città <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="startup-titolo" className="section">
        <div className="container-sw">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="startup-titolo" eyebrow="Startup nate agli SW" title="Da un pitch di 60 secondi a un'azienda vera" />
            <Link href="/startup" className="link inline-flex items-center gap-1">
              Vedi tutte <ArrowRight />
            </Link>
          </div>
          <StartupList items={startups.slice(0, 3)} />
        </div>
      </section>

      <section aria-labelledby="foto-titolo" className="section bg-superficie">
        <div className="container-sw">
          <SectionHeading id="foto-titolo" eyebrow="Foto" title="Com'è uno Startup Weekend, visto da dentro" />
          <PhotoGallery items={photos.slice(0, 6)} />
        </div>
      </section>

      <section aria-labelledby="stampa-titolo" className="section">
        <div className="container-sw">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="stampa-titolo" eyebrow="Dicono di noi" title="Rassegna stampa" />
            <Link href="/stampa" className="link inline-flex items-center gap-1">
              Tutta la rassegna <ArrowRight />
            </Link>
          </div>
          <PressList items={press.slice(0, 3)} />
          <h3 className="mt-16 text-2xl font-bold">Media partner</h3>
          <MediaPartners items={mediaPartners} />
        </div>
      </section>

      <section aria-labelledby="faq-titolo" className="section bg-superficie">
        <div className="container-sw">
          <SectionHeading id="faq-titolo" eyebrow="FAQ" title="Domande frequenti" />
          <FaqList items={homeFaqs} />
          <p className="mt-6">
            <Link href="/faq" className="link inline-flex items-center gap-1">
              Tutte le FAQ, anche per organizzatori <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      <section id="newsletter" aria-labelledby="newsletter-titolo" className="section">
        <div className="container-sw grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="newsletter-titolo"
              eyebrow="Newsletter"
              title="Ti avvisiamo quando c'è uno SW vicino a te"
              lead="Una mail quando esce una nuova data nelle città che scegli. Niente spam."
            />
            <Newsletter cities={cityOptions} />
          </div>
          <div className="rounded-2xl bg-superficie-alt p-8">
            <h3 className="text-2xl font-bold">Seguici</h3>
            <p className="mt-2 text-blu-2">Foto, storie e dietro le quinte degli Startup Weekend italiani.</p>
            <SocialLinks links={social} className="mt-4" />
            <p className="mt-6 text-sm text-blu-2">
              Hai una domanda?{" "}
              <Link href="/contatti" className="link">
                Scrivici
              </Link>
            </p>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(homeFaqs)} />
      {cities.map((c) => {
        const ev = eventJsonLd(c, site.url);
        return ev ? <JsonLd key={c.slug} data={ev} /> : null;
      })}
    </>
  );
}
