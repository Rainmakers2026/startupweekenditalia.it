import Link from "next/link";
import { cities, type Startup } from "@/lib/content";
import { External } from "./Icons";

const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;

export function StartupList({ items }: { items: Startup[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-8 rounded-2xl bg-superficie-alt p-6 text-blu-2">
        Stiamo raccogliendo le storie delle startup nate agli SW. La tua è una di queste?{" "}
        <Link href="/contatti" className="link">Scrivici</Link>
      </p>
    );
  }
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <li key={`${s.name}-${i}`} className="card">
          <p className="text-sm font-semibold text-azzurro-forte">
            SW {cityName(s.city)}
            {s.year ? ` · ${s.year}` : ""}
          </p>
          <h3 className="mt-1 text-xl font-bold">{s.name}</h3>
          <p className="mt-2 text-sm text-blu-2">{s.description}</p>
          {s.website && (
            <a href={s.website} target="_blank" rel="noopener" className="link mt-4 inline-flex items-center gap-1 text-sm">
              Sito <External />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
