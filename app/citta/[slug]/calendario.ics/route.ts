import { cities, getCity, site } from "@/lib/content";
import { cityIcs } from "@/lib/ics";

export const dynamic = "force-static";
export const revalidate = 86400;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCity(slug);
  const ics = city ? cityIcs(city, site.url) : null;
  if (!city || !ics) return new Response("Nessuna data in calendario", { status: 404 });
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="startup-weekend-${city.slug}.ics"`,
    },
  });
}
