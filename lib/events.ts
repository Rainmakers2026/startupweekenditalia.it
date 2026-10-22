import type { City } from "./content";
import { upcomingDate } from "./dates";

/** schema.org Event per le città con una data confermata. */
export function eventJsonLd(city: City, siteUrl: string) {
  const d = upcomingDate(city);
  if (!d) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Startup Weekend ${city.name}`,
    startDate: d.start,
    endDate: d.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: city.nextEdition.venue ?? city.name,
      address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: city.region, addressCountry: "IT" },
    },
    description: "54 ore per trasformare un'idea in una startup: pitch, team, prototipo e demo davanti a una giuria.",
    url: `${siteUrl}/citta/${city.slug}`,
    organizer: { "@type": "Organization", name: `Startup Weekend ${city.name}`, url: city.website ?? `${siteUrl}/citta/${city.slug}` },
    ...(city.ticketUrl ? { offers: { "@type": "Offer", url: city.ticketUrl, availability: "https://schema.org/InStock" } } : {}),
  };
}
