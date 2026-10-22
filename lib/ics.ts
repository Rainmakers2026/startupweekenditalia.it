import type { City } from "./content";
import { upcomingDate } from "./dates";

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const compact = (iso: string) => iso.replace(/-/g, "");

function nextDay(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function cityIcs(city: City, siteUrl: string): string | null {
  const date = upcomingDate(city);
  if (!date) return null;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Startup Weekend Italia//IT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:sw-${city.slug}-${date.start}@startupweekenditalia.it`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${compact(date.start)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(date.end))}`,
    `SUMMARY:${esc(`Startup Weekend ${city.name}`)}`,
    city.nextEdition.venue ? `LOCATION:${esc(city.nextEdition.venue)}` : null,
    `URL:${city.ticketUrl ?? city.website ?? `${siteUrl}/citta/${city.slug}`}`,
    `DESCRIPTION:${esc(`54 ore per trasformare un'idea in una startup. Info: ${siteUrl}/citta/${city.slug}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n") + "\r\n";
}
