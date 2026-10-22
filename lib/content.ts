import { z } from "zod";
import citiesJson from "@/content/cities.json";
import faqJson from "@/content/faq.json";
import startupsJson from "@/content/startups.json";
import pressJson from "@/content/press.json";
import partnersJson from "@/content/media-partners.json";
import photosJson from "@/content/photos.json";
import socialJson from "@/content/social.json";
import siteJson from "@/content/site.json";

const url = z.string().url().nullable();
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable();

const citySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  region: z.string(),
  coords: z.object({ lat: z.number(), lng: z.number() }),
  status: z.enum(["attiva", "in-apertura"]),
  website: url,
  ticketUrl: url,
  social: z.object({ instagram: z.string().url().optional(), linkedin: z.string().url().optional(), facebook: z.string().url().optional() }),
  nextEdition: z.object({
    startDate: isoDate,
    endDate: isoDate,
    venue: z.string().nullable(),
    edition: z.number().int().nullable(),
    note: z.string().nullable(),
  }),
  special: z
    .object({
      label: z.string(),
      description: z.string(),
      compliance: z.string().optional(),
      canRegisterOnline: z.boolean(),
    })
    .nullable(),
  referentiStatic: z.array(z.string()),
});

const faqSchema = z.object({
  audience: z.enum(["partecipanti", "organizzatori"]),
  q: z.string(),
  a: z.array(z.string()),
});

const startupSchema = z.object({
  name: z.string(),
  city: z.string(),
  year: z.number().int().nullable(),
  description: z.string(),
  website: url,
  placeholder: z.boolean().optional(),
});

const pressSchema = z.object({
  outlet: z.string(),
  title: z.string(),
  date: isoDate,
  url,
  city: z.string().nullable(),
  placeholder: z.boolean().optional(),
});

const partnerSchema = z.object({
  name: z.string(),
  url,
  cities: z.union([z.literal("tutte"), z.array(z.string())]),
  placeholder: z.boolean().optional(),
});

const photoSchema = z.object({
  src: z.string(),
  city: z.string(),
  year: z.number().int(),
  alt: z.string().min(5),
  credit: z.string().nullable(),
  width: z.number().int(),
  height: z.number().int(),
});

const socialSchema = z.record(z.string(), z.string().url().nullable());

const siteSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  email: z.string().email(),
  pressKitUrl: url,
});

export type City = z.infer<typeof citySchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Startup = z.infer<typeof startupSchema>;
export type PressItem = z.infer<typeof pressSchema>;
export type MediaPartner = z.infer<typeof partnerSchema>;
export type Photo = z.infer<typeof photoSchema>;

// Validati in build: un errore nei file /content blocca il deploy invece di rompere la pagina.
export const cities: City[] = z
  .array(citySchema)
  .parse(citiesJson)
  .sort((a, b) => a.name.localeCompare(b.name, "it"));
export const faqs: Faq[] = z.array(faqSchema).parse(faqJson);
export const startups: Startup[] = z.array(startupSchema).parse(startupsJson);
export const press: PressItem[] = z.array(pressSchema).parse(pressJson);
export const mediaPartners: MediaPartner[] = z.array(partnerSchema).parse(partnersJson);
export const photos: Photo[] = z.array(photoSchema).parse(photosJson);
export const social = socialSchema.parse(socialJson);
export const site = siteSchema.parse(siteJson);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
