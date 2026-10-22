import type { City } from "./content";

const TZ = "Europe/Rome";

function parse(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

/** La prossima edizione è "confermata" solo se ha una data non ancora passata. */
export function upcomingDate(city: City): { start: string; end: string } | null {
  const { startDate, endDate } = city.nextEdition;
  if (!startDate) return null;
  const end = endDate ?? startDate;
  if (end < todayIso()) return null;
  return { start: startDate, end };
}

export function formatRange(start: string, end: string): string {
  const s = parse(start);
  const e = parse(end);
  const day = (d: Date) => new Intl.DateTimeFormat("it-IT", { day: "numeric", timeZone: TZ }).format(d);
  const month = (d: Date) => new Intl.DateTimeFormat("it-IT", { month: "long", timeZone: TZ }).format(d);
  const year = (d: Date) => d.getUTCFullYear();
  if (start === end) return `${day(s)} ${month(s)} ${year(s)}`;
  if (month(s) === month(e) && year(s) === year(e)) return `${day(s)}–${day(e)} ${month(s)} ${year(s)}`;
  if (year(s) === year(e)) return `${day(s)} ${month(s)} – ${day(e)} ${month(e)} ${year(s)}`;
  return `${day(s)} ${month(s)} ${year(s)} – ${day(e)} ${month(e)} ${year(e)}`;
}

export function daysUntil(start: string): number {
  const ms = parse(start).getTime() - parse(todayIso()).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/** Città ordinate: prima quelle con data (per data), poi le altre in ordine alfabetico. */
export function sortByNextDate(list: City[]): City[] {
  return [...list].sort((a, b) => {
    const da = upcomingDate(a)?.start;
    const db = upcomingDate(b)?.start;
    if (da && db) return da.localeCompare(db);
    if (da) return -1;
    if (db) return 1;
    return a.name.localeCompare(b.name, "it");
  });
}
