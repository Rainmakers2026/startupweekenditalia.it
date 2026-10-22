import Link from "next/link";
import type { CityView } from "@/lib/view";
import { ArrowRight } from "./Icons";

function Action({ c }: { c: CityView }) {
  if (c.special && !c.special.canRegisterOnline) {
    return (
      <Link href={`/citta/${c.slug}`} className="link text-sm">
        Solo scuole
      </Link>
    );
  }
  if (c.date && c.ticketUrl) {
    return (
      <a href={c.ticketUrl} target="_blank" rel="noopener" className="link inline-flex items-center gap-1 text-sm">
        Biglietti <ArrowRight />
      </a>
    );
  }
  return (
    <Link href={`/citta/${c.slug}`} className="link text-sm">
      Info
    </Link>
  );
}

/** Tabella su desktop, lista di card su mobile. Ordine: prima le date confermate. */
export function UpcomingTable({ cities }: { cities: CityView[] }) {
  return (
    <div className="mt-10">
      <table className="hidden w-full text-left md:table">
        <caption className="sr-only">Prossimi Startup Weekend in Italia</caption>
        <thead className="border-b-2 border-blu text-sm">
          <tr>
            <th scope="col" className="py-3 pr-4">Data</th>
            <th scope="col" className="py-3 pr-4">Città</th>
            <th scope="col" className="py-3 pr-4">Luogo</th>
            <th scope="col" className="py-3 pr-4">Edizione</th>
            <th scope="col" className="py-3"><span className="sr-only">Azione</span></th>
          </tr>
        </thead>
        <tbody>
          {cities.map((c) => (
            <tr key={c.slug} className="border-b border-filo align-top">
              <td className="py-4 pr-4 font-semibold">
                {c.date ? c.date.label : <span className="text-blu-2">{c.note ?? "Data in arrivo"}</span>}
                {c.date && c.note && <span className="block text-xs font-normal text-blu-2">{c.note}</span>}
              </td>
              <th scope="row" className="py-4 pr-4 font-display font-bold">
                <Link href={`/citta/${c.slug}`} className="hover:text-azzurro-forte">{c.name}</Link>
                {c.special && <span className="badge ml-2 bg-fuxia-tenue align-middle font-sans text-fuxia-forte-hover">{c.special.label}</span>}
              </th>
              <td className="py-4 pr-4 text-sm text-blu-2">{c.venue ?? "—"}</td>
              <td className="py-4 pr-4 text-sm text-blu-2">{c.edition ? `${c.edition}ª` : "—"}</td>
              <td className="py-4 text-right"><Action c={c} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 md:hidden">
        {cities.map((c) => (
          <li key={c.slug} className="card !p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold">{c.name}</p>
                <p className={`text-sm ${c.date ? "font-semibold" : "text-blu-2"}`}>{c.date ? c.date.label : (c.note ?? "Data in arrivo")}</p>
                {c.venue && <p className="mt-1 text-xs text-blu-2">{c.venue}</p>}
                {c.special && <span className="badge mt-2 bg-fuxia-tenue text-fuxia-forte-hover">{c.special.label}</span>}
              </div>
              <Action c={c} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
