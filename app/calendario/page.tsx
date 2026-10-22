import type { Metadata } from "next";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { CalendarLinks } from "@/components/CalendarLinks";
import { PageHero } from "@/components/PageHero";
import { UpcomingTable } from "@/components/UpcomingTable";
import { getReferenti } from "@/lib/airtable";
import { cities } from "@/lib/content";
import { sortByNextDate } from "@/lib/dates";
import { toView } from "@/lib/view";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Calendario degli Startup Weekend in Italia",
  description:
    "Tutte le date degli Startup Weekend italiani. Aggiungi il calendario condiviso a Google, Apple o Outlook e non perdere nessuna edizione.",
  alternates: { canonical: "/calendario" },
};

export default async function CalendarPage() {
  const referenti = await getReferenti();
  const list = sortByNextDate(cities).map((c) => toView(c, referenti));
  return (
    <>
      <PageHero
        eyebrow="Calendario"
        title="Tutte le date, in un unico calendario"
        lead="Aggiungilo una volta e si aggiorna da solo: ogni nuova edizione compare nel tuo calendario."
      >
        <CalendarLinks />
      </PageHero>
      <section className="section" aria-labelledby="tabella">
        <div className="container-sw">
          <h2 id="tabella" className="h2">
            Prossimi Startup Weekend
          </h2>
          <UpcomingTable cities={list} />
        </div>
      </section>
      <section className="section bg-superficie" aria-labelledby="gcal">
        <div className="container-sw">
          <h2 id="gcal" className="h2">
            Il calendario condiviso
          </h2>
          <div className="mt-8">
            <CalendarEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
