import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarIcon, External, School } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { StartupList } from "@/components/StartupList";
import { getReferenti } from "@/lib/airtable";
import { cities, getCity, photos, site, startups } from "@/lib/content";
import { eventJsonLd } from "@/lib/events";
import { toView } from "@/lib/view";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity((await params).slug);
  if (!city) return {};
  const view = toView(city, {});
  return {
    title: `Startup Weekend ${city.name}: prossima edizione e info`,
    description: view.date
      ? `Startup Weekend ${city.name}: ${view.date.label}. 54 ore per trasformare un'idea in una startup. Date, luogo, biglietti e referenti.`
      : `Startup Weekend ${city.name}: date della prossima edizione, referenti e come partecipare. 54 ore per creare una startup.`,
    alternates: { canonical: `/citta/${city.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const city = getCity((await params).slug);
  if (!city) notFound();
  const c = toView(city, await getReferenti());
  const youth = c.special && !c.special.canRegisterOnline;
  const cityStartups = startups.filter((s) => s.city === c.slug);
  const cityPhotos = photos.filter((p) => p.city === c.slug);
  const ev = eventJsonLd(city, site.url);

  return (
    <>
      <PageHero
        eyebrow={c.region}
        title={`Startup Weekend ${c.name}`}
        lead={c.date ? `Prossima edizione: ${c.date.label}${c.venue ? ` · ${c.venue}` : ""}` : `Prossima edizione: ${c.note ?? "in preparazione"}`}
      >
        {c.special && <span className="badge mt-6 bg-fuxia-tenue text-fuxia-forte-hover">{c.special.label}</span>}
        <div className="mt-8 flex flex-wrap gap-3">
          {youth ? (
            <Link href={`/contatti?citta=${c.slug}&motivo=scuola`} className="btn-primary">
              Sei una scuola? Contattaci <ArrowRight />
            </Link>
          ) : c.date ? (
            <>
              {c.ticketUrl && (
                <a href={c.ticketUrl} target="_blank" rel="noopener" className="btn-primary">
                  Prendi il biglietto <ArrowRight />
                </a>
              )}
              <a href={`/citta/${c.slug}/calendario.ics`} className="btn-secondary" download>
                <CalendarIcon className="size-4" /> Aggiungi al calendario
              </a>
            </>
          ) : (
            <>
              <Link href={`/?citta=${c.slug}#newsletter`} className="btn-primary">
                Avvisami quando esce la data <ArrowRight />
              </Link>
              <Link href={`/organizza?citta=${c.slug}`} className="btn-secondary">
                Dai una mano a organizzarla
              </Link>
            </>
          )}
        </div>
        {c.date?.daysLeft !== undefined && <p className="mt-4 text-sm text-bianco-2">Mancano {c.date.daysLeft} giorni{c.note ? ` · ${c.note}` : ""}</p>}
      </PageHero>

      {youth && c.special && (
        <section aria-labelledby="youth-titolo" className="section bg-fuxia-tenue">
          <div className="container-sw max-w-3xl">
            <p className="eyebrow flex items-center gap-2 !text-fuxia-forte-hover">
              <School className="size-4" /> Format speciale
            </p>
            <h2 id="youth-titolo" className="h2">
              Startup Weekend Youth: solo per studenti delle scuole superiori
            </h2>
            <p className="mt-4 text-lg">{c.special.description}</p>
            {c.special.compliance && <p className="mt-4 text-sm text-blu-2">{c.special.compliance}</p>}
            <p className="mt-6">
              Sei un docente o un dirigente scolastico e vuoi coinvolgere la tua scuola?{" "}
              <Link href={`/contatti?citta=${c.slug}&motivo=scuola`} className="link">
                Contatta il team di {c.name}
              </Link>
            </p>
          </div>
        </section>
      )}

      <section aria-labelledby="team-titolo" className="section">
        <div className="container-sw grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading id="team-titolo" eyebrow="Il team" title={`Chi organizza a ${c.name}`} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.referenti.length ? (
                c.referenti.map((r) => (
                  <li key={r} className="rounded-full bg-superficie-alt px-4 py-2 font-semibold">
                    {r}
                  </li>
                ))
              ) : (
                <li className="text-blu-2">Lorem ipsum</li>
              )}
            </ul>
            <p className="mt-6 text-sm text-blu-2">
              Vuoi entrare nel team?{" "}
              <Link href={`/organizza?citta=${c.slug}`} className="link">
                Candidati
              </Link>
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold">Link utili</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Sito di Startup Weekend {c.name}</dt>
                <dd className="mt-1">
                  {c.website ? (
                    <a href={c.website} target="_blank" rel="noopener" className="link inline-flex items-center gap-1">
                      {c.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <External />
                    </a>
                  ) : (
                    <span className="text-blu-2">Lorem ipsum</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Social</dt>
                <dd className="mt-1 text-blu-2">
                  <SocialLinks links={c.social} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="startup-citta" className="section bg-superficie">
        <div className="container-sw">
          <SectionHeading id="startup-citta" eyebrow="Startup" title={`Nate allo Startup Weekend ${c.name}`} />
          <StartupList items={cityStartups} />
        </div>
      </section>

      <section aria-labelledby="foto-citta" className="section">
        <div className="container-sw">
          <SectionHeading id="foto-citta" eyebrow="Foto" title={`Le edizioni di ${c.name}`} />
          <PhotoGallery items={cityPhotos} placeholders={3} />
        </div>
      </section>

      <nav aria-label="Percorso" className="container-sw pb-12 text-sm text-blu-2">
        <Link href="/" className="hover:text-blu">Home</Link> / <Link href="/#citta" className="hover:text-blu">Città</Link> / <span aria-current="page">{c.name}</span>
      </nav>

      {ev && <JsonLd data={ev} />}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Città", item: `${site.url}/#citta` },
            { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}/citta/${c.slug}` },
          ],
        }}
      />
    </>
  );
}
