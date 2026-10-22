import Link from "next/link";
import { site, social } from "@/lib/content";
import { NAV } from "./Header";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="on-dark bg-blu text-bianco">
      <div className="container-sw grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-sm text-bianco-2">
            54 ore per trasformare un&apos;idea in una startup. La rete italiana degli Startup Weekend, città per città.
          </p>
          <p className="mt-6 text-sm text-bianco-2">
            Scrivici: {/* TODO: email reale */}
            <a href={`mailto:${site.email}`} className="font-semibold text-white underline underline-offset-4">
              {site.email}
            </a>
          </p>
          <SocialLinks links={social} className="mt-4 text-white" />
        </div>
        <nav aria-label="Link nel footer">
          <h2 className="font-display text-sm font-bold tracking-wider text-azzurro uppercase">Esplora</h2>
          <ul className="mt-4 space-y-2">
            {[...NAV, { href: "/contatti", label: "Contatti" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-azzurro">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-azzurro uppercase">Newsletter</h2>
          <p className="mt-4 text-bianco-2">Ti scriviamo solo quando c&apos;è uno Startup Weekend nella tua zona.</p>
          <Newsletter compact />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-sw flex flex-col gap-3 py-6 text-sm text-bianco-2 md:flex-row md:items-center md:justify-between">
          <p>
            Startup Weekend è un programma{" "}
            <a href="https://www.techstars.com/communities/startup-weekend" className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener">
              Techstars
            </a>
            . Questo sito è curato dalla community italiana degli organizzatori.
          </p>
          <ul className="flex flex-wrap gap-4">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/cookie" className="hover:text-white">Cookie</Link></li>
            <li>
              Mappa: confini{" "}
              <a href="https://github.com/openpolis/geojson-italy" className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener">
                ISTAT / openpolis
              </a>{" "}
              (CC BY 4.0)
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
