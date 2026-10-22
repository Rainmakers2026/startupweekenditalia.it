"use client";

import { useEffect, useId, useState } from "react";

type Props = { compact?: boolean; cities?: { slug: string; name: string }[] };

const ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

/**
 * Form che invia direttamente al provider newsletter (double opt-in gestito da lui).
 * Legge ?citta=slug dall'URL per preselezionare la città arrivando dalla mappa.
 */
export function Newsletter({ compact = false, cities = [] }: Props) {
  const id = useId();
  const [city, setCity] = useState("");

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("citta");
    if (slug && cities.some((c) => c.slug === slug)) setCity(slug);
  }, [cities]);

  return (
    <form action={ACTION || undefined} method="post" target="_blank" className={`mt-4 ${compact ? "space-y-3" : "grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end"}`}>
      <div>
        <label htmlFor={`${id}-email`} className="field-label">Email</label>
        <input id={`${id}-email`} name="EMAIL" type="email" required autoComplete="email" placeholder="nome@esempio.it" className="field" />
      </div>
      {!compact && cities.length > 0 && (
        <div>
          <label htmlFor={`${id}-city`} className="field-label">Città che ti interessa</label>
          <select id={`${id}-city`} name="CITTA" value={city} onChange={(e) => setCity(e.target.value)} className="field">
            <option value="">Tutte</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      )}
      <button type="submit" className="btn-primary" disabled={!ACTION} aria-describedby={`${id}-note`}>
        {ACTION ? "Iscriviti" : "In arrivo"}
      </button>
      <p id={`${id}-note`} className={`text-xs opacity-80 ${compact ? "" : "sm:col-span-3"}`}>
        {ACTION ? (
          <>Riceverai una mail per confermare. Puoi disiscriverti quando vuoi. <a href="/privacy" className="underline">Privacy</a></>
        ) : (
          "La newsletter sarà attiva a breve."
        )}
      </p>
    </form>
  );
}
