import type { City } from "./content";
import { daysUntil, formatRange, upcomingDate } from "./dates";
import { project } from "./italy-map";

/** Dati di una città già pronti per la UI (serializzabili, passabili ai client component). */
export type CityView = {
  slug: string;
  name: string;
  region: string;
  website: string | null;
  ticketUrl: string | null;
  social: City["social"];
  status: City["status"];
  date: { label: string; start: string; daysLeft: number } | null;
  venue: string | null;
  edition: number | null;
  note: string | null;
  special: City["special"];
  referenti: string[];
  x: number;
  y: number;
};

export function toView(city: City, referenti: Record<string, string[]>): CityView {
  const d = upcomingDate(city);
  const { x, y } = project(city.coords.lat, city.coords.lng);
  return {
    slug: city.slug,
    name: city.name,
    region: city.region,
    website: city.website,
    ticketUrl: city.ticketUrl,
    social: city.social,
    status: city.status,
    date: d ? { label: formatRange(d.start, d.end), start: d.start, daysLeft: daysUntil(d.start) } : null,
    venue: d ? city.nextEdition.venue : null,
    edition: city.nextEdition.edition,
    note: city.nextEdition.note,
    special: city.special,
    referenti: referenti[city.slug] ?? city.referentiStatic,
    x,
    y,
  };
}

/**
 * Allontana i pin troppo vicini (es. Milano/Pavia, Parma/Reggio Emilia) così che ognuno resti
 * toccabile: almeno 24px tra i centri anche sulla mappa larga ~360px del mobile (WCAG 2.5.8).
 * La mappa è schematica: uno spostamento di pochi km non cambia la lettura.
 */
export function spreadPins(views: CityView[], minDist = 36): CityView[] {
  const pts = views.map((v) => ({ ...v }));
  for (let iter = 0; iter < 200; iter++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j].x - pts[i].x;
        const dy = pts[j].y - pts[i].y;
        const d = Math.hypot(dx, dy) || 0.01;
        if (d >= minDist) continue;
        const push = (minDist - d) / 2 + 0.01;
        const ux = dx / d;
        const uy = dy / d;
        pts[i].x -= ux * push;
        pts[i].y -= uy * push;
        pts[j].x += ux * push;
        pts[j].y += uy * push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return pts;
}
