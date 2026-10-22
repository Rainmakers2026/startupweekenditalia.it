import Link from "next/link";
import type { CityView } from "@/lib/view";
import { ArrowRight, External } from "./Icons";
import { SocialLinks } from "./SocialLinks";

/** Elenco di tutte le città: link ai siti cittadini e alternativa testuale alla mappa. */
export function CityGrid({ cities }: { cities: CityView[] }) {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((c) => (
        <li key={c.slug} className="card flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold">
                <Link href={`/citta/${c.slug}`} className="hover:text-azzurro-forte">
                  {c.name}
                </Link>
              </h3>
              <p className="text-sm text-blu-2">{c.region}</p>
            </div>
            {c.date ? (
              <span className="badge bg-fuxia-forte text-white">{c.date.label}</span>
            ) : (
              <span className="badge bg-superficie-alt text-blu-2">{c.note ?? "Data in arrivo"}</span>
            )}
          </div>
          {c.special && <span className="badge mt-3 self-start bg-fuxia-tenue text-fuxia-forte-hover">{c.special.label}</span>}
          <p className="mt-4 text-sm">
            <span className="font-semibold">Referenti: </span>
            <span className="text-blu-2">{c.referenti.length ? c.referenti.join(", ") : "Lorem ipsum"}</span>
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-sm">
            {c.website ? (
              <a href={c.website} target="_blank" rel="noopener" className="link inline-flex items-center gap-1">
                Sito di {c.name} <External />
              </a>
            ) : (
              <span className="text-blu-2">Lorem ipsum</span>
            )}
            <Link href={`/citta/${c.slug}`} className="inline-flex items-center gap-1 font-semibold hover:text-azzurro-forte" aria-label={`Scopri Startup Weekend ${c.name}`}>
              Scopri <ArrowRight />
            </Link>
          </div>
          {Object.values(c.social).some(Boolean) && <SocialLinks links={c.social} className="mt-3" />}
        </li>
      ))}
      <li className="flex flex-col justify-center rounded-2xl border-2 border-dashed border-filo-forte p-6">
        <h3 className="text-xl font-bold">Non vedi la tua città?</h3>
        <p className="mt-2 text-sm text-blu-2">Portala tu. Ti aiutiamo noi a partire.</p>
        <Link href="/organizza" className="link mt-4 inline-flex items-center gap-1">
          Apri uno SW <ArrowRight />
        </Link>
      </li>
    </ul>
  );
}
