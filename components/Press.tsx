import Link from "next/link";
import type { MediaPartner, PressItem } from "@/lib/content";
import { ArrowRight, External } from "./Icons";

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00Z`));

export function PressList({ items }: { items: PressItem[] }) {
  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-3">
      {items.map((p, i) => (
        <li key={`${p.title}-${i}`} className="card flex flex-col">
          <p className="text-sm font-semibold tracking-wider text-blu-2 uppercase">{p.outlet}</p>
          <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-blu-2">{p.date ? fmt(p.date) : "Data: lorem ipsum"}</p>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener" className="link mt-auto inline-flex items-center gap-1 pt-4 text-sm">
              Leggi l&apos;articolo <External />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export function MediaPartners({ items }: { items: MediaPartner[] }) {
  return (
    <div>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((m, i) => {
          const inner = <span className="text-center text-sm font-semibold text-blu-2">{m.name}</span>;
          return (
            <li key={`${m.name}-${i}`} className="grid h-24 place-items-center rounded-2xl border border-filo bg-pagina p-4 grayscale hover:grayscale-0">
              {m.url ? (
                <a href={m.url} target="_blank" rel="noopener">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-blu-2">
        Ogni Startup Weekend cittadino viene rilanciato dai nostri media partner. Sei una testata e vuoi sostenere l&apos;innovazione dal basso?{" "}
        <Link href="/contatti?motivo=media" className="link inline-flex items-center gap-1">
          Diventa media partner <ArrowRight />
        </Link>
      </p>
    </div>
  );
}
