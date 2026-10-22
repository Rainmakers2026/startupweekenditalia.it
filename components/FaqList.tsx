import type { Faq } from "@/lib/content";

/** Accordion senza JavaScript con <details>. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="mt-8 divide-y divide-filo border-y border-filo">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-superficie-alt text-xl leading-none transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-3 max-w-3xl space-y-3 text-blu-2">
            {f.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
}
