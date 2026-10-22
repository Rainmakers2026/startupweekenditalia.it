import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { StartupList } from "@/components/StartupList";
import { cities, startups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Le startup nate agli Startup Weekend",
  description: "Dal pitch di 60 secondi a un'azienda vera: le startup nate agli Startup Weekend italiani, città per città.",
  alternates: { canonical: "/startup" },
};

export default function StartupsPage() {
  const groups = cities.map((c) => ({ city: c, items: startups.filter((s) => s.city === c.slug) })).filter((g) => g.items.length > 0);
  return (
    <>
      <PageHero
        eyebrow="Startup"
        title="Da un pitch di 60 secondi a un'azienda vera"
        lead="Le startup nate agli Startup Weekend italiani. La tua manca? Scrivici e la aggiungiamo."
      />
      <section className="section">
        <div className="container-sw">
          {groups.length === 0 ? (
            <StartupList items={[]} />
          ) : (
            <>
              <nav aria-label="Filtra per città" className="flex flex-wrap gap-2">
                {groups.map((g) => (
                  <a key={g.city.slug} href={`#${g.city.slug}`} className="rounded-full border border-filo-forte px-4 py-2 text-sm font-semibold hover:border-blu">
                    {g.city.name}
                  </a>
                ))}
              </nav>
              {groups.map((g) => (
                <div key={g.city.slug} id={g.city.slug} className="mt-14">
                  <h2 className="h2">{g.city.name}</h2>
                  <StartupList items={g.items} />
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
