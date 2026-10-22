import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";
import { monaSans, stackSansNotch } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Startup Weekend Italia — crea una startup in 54 ore",
    template: "%s | Startup Weekend Italia",
  },
  description:
    "Trova lo Startup Weekend più vicino a te: date, città e referenti di tutti gli SW in Italia. Pitch, team e prototipo in un weekend.",
  openGraph: { type: "website", locale: "it_IT", siteName: site.name },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#042359" };

const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${monaSans.variable} ${stackSansNotch.variable}`}>
      <body>
        <a href="#contenuto" className="sr-only z-50 rounded-full bg-fuxia-forte px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Salta al contenuto
        </a>
        <Header />
        <main id="contenuto">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            email: site.email,
            parentOrganization: { "@type": "Organization", name: "Techstars", url: "https://www.techstars.com" },
          }}
        />
        {PLAUSIBLE && <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="lazyOnload" />}
      </body>
    </html>
  );
}
