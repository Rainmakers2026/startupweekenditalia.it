/** Dati strutturati schema.org. `<` viene escapato per non chiudere lo script per sbaglio. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
