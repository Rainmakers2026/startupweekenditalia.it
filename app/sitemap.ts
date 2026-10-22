import type { MetadataRoute } from "next";
import { cities, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/calendario", "/organizza", "/startup", "/stampa", "/faq", "/contatti"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...cities.map((c) => ({ url: `${site.url}/citta/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
