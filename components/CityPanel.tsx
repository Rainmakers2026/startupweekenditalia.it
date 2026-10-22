import Link from "next/link";
import type { CityView } from "@/lib/view";
import { ArrowRight, CalendarIcon, External, Pin, School, Users } from "./Icons";
import { SocialLinks } from "./SocialLinks";

/** Infografica di una città: la stessa scheda si apre dalla mappa (desktop e mobile). */
export function CityPanel({ city, headingId }: { city: CityView; headingId?: string }) {
  const youth = city.special && !city.special.canRegisterOnline;
  return (
    <div>
      <p className="eyebrow">{city.region}</p>
      <h3 id={headingId} className="mt-1 text-3xl font-bold">
        Startup Weekend {city.name}
      </h3>
      {city.special && (
        <p className="mt-3">
          <span className="badge bg-fuxia-tenue text-fuxia-forte-hover">{city.special.label}</span>
        </p>
      )}

      {city.date ? (
        <div className="mt-5 rounded-2xl bg-blu p-5 text-white">
          <p className="flex items-center gap-2 text-sm font-semibold text-azzurro">
            <CalendarIcon /> Prossima edizione{city.edition ? ` · ${city.edition}ª` : ""}
          </p>
          <p className="mt-2 font-display text-2xl font-bold">{city.date.label}</p>
          {city.venue && (
            <p className="mt-2 flex gap-2 text-sm text-bianco-2">
              <Pin className="size-4 shrink-0 translate-y-0.5" /> {city.venue}
            </p>
          )}
          <p className="mt-3 text-sm text-bianco-2">
            {city.date.daysLeft === 0 ? "È oggi!" : `Mancano ${city.date.daysLeft} giorni`}
            {city.note ? ` · ${city.note}` : ""}
          </p>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-superficie-alt p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-azzurro-forte">
            <CalendarIcon /> Prossima edizione{city.edition ? ` · ${city.edition}ª` : ""}
          </p>
          <p className="mt-2 font-display text-xl font-bold">{city.note ?? "In preparazione"}</p>
          <p className="mt-1 text-sm text-blu-2">
            {youth
              ? "La data esatta non è ancora fissata."
              : "La data non è ancora fissata. Lascia la tua email e ti avvisiamo appena esce."}
          </p>
        </div>
      )}

      {youth && city.special && (
        <div className="mt-5 rounded-2xl border-2 border-fuxia-tenue p-5">
          <p className="flex items-center gap-2 font-semibold">
            <School /> Solo per studenti delle superiori
          </p>
          <p className="mt-2 text-sm text-blu-2">{city.special.description}</p>
          {city.special.compliance && <p className="mt-2 text-xs text-blu-3">{city.special.compliance}</p>}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {youth ? (
          <Link href={`/contatti?citta=${city.slug}&motivo=scuola`} className="btn-primary">
            Sei una scuola? Contattaci <ArrowRight />
          </Link>
        ) : city.date ? (
          <>
            {city.ticketUrl && (
              <a href={city.ticketUrl} target="_blank" rel="noopener" className="btn-primary">
                Prendi il biglietto <ArrowRight />
              </a>
            )}
            <a href={`/citta/${city.slug}/calendario.ics`} className="btn-secondary" download>
              <CalendarIcon className="size-4" /> Aggiungi al calendario
            </a>
          </>
        ) : (
          <Link href={`/?citta=${city.slug}#newsletter`} className="btn-primary">
            Voglio partecipare <ArrowRight />
          </Link>
        )}
      </div>

      {!city.date && !youth && (
        <p className="mt-3 text-sm">
          <Link href={`/organizza?citta=${city.slug}`} className="link">
            Dai una mano a organizzarla
          </Link>
        </p>
      )}

      <dl className="mt-6 space-y-4 border-t border-filo pt-5 text-sm">
        <div>
          <dt className="flex items-center gap-2 font-semibold">
            <Users className="size-4" /> Referenti
          </dt>
          <dd className="mt-1 text-blu-2">{city.referenti.length ? city.referenti.join(", ") : "Lorem ipsum"}</dd>
        </div>
        <div>
          <dt className="font-semibold">Sito della città</dt>
          <dd className="mt-1">
            {city.website ? (
              <a href={city.website} target="_blank" rel="noopener" className="link inline-flex items-center gap-1">
                {city.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <External />
              </a>
            ) : (
              <span className="text-blu-2">Lorem ipsum</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Social</dt>
          <dd className="mt-1 text-blu-2">
            <SocialLinks links={city.social} />
          </dd>
        </div>
      </dl>

      <p className="mt-6">
        <Link href={`/citta/${city.slug}`} className="link inline-flex items-center gap-1">
          Vai alla pagina di {city.name} <ArrowRight />
        </Link>
      </p>
    </div>
  );
}
