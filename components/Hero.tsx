import Link from "next/link";
import { ArrowRight } from "./Icons";

export function Hero({ cityCount }: { cityCount: number }) {
  return (
    // Sfumature con gradienti CSS: nessuna immagine per l'LCP e nessun filtro blur costoso da disegnare.
    <section className="on-dark relative overflow-hidden bg-blu bg-[radial-gradient(40rem_28rem_at_100%_0%,rgb(39_168_232/0.16),transparent_70%),radial-gradient(36rem_26rem_at_0%_100%,rgb(225_81_141/0.16),transparent_70%)] text-white">
      <div className="container-sw relative py-20 sm:py-28">
        <p className="eyebrow">Startup Weekend Italia</p>
        <h1 className="mt-3 max-w-4xl text-4xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
          Trasforma la tua idea in una startup <span className="text-azzurro">in 54 ore.</span>
        </h1>
        <p className="lead !text-xl">
          Pitchi un&apos;idea, formi un team, costruisci una startup in un weekend. In Italia siamo in {cityCount} città: trova la tua.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#mappa" className="btn-primary">
            Trova il tuo SW <ArrowRight />
          </Link>
          <Link href="/organizza" className="btn-secondary">
            Apri uno SW nella tua città
          </Link>
        </div>
        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
          {[
            [String(cityCount), "città in Italia"],
            ["54", "ore di lavoro"],
            ["3", "giorni"],
            ["60″", "per il tuo pitch"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold text-white">{value}</span>
                <span className="text-sm text-bianco-2">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-bianco-2">
          Nel mondo: oltre 7.000 eventi in più di 150 paesi.{" "}
          <a href="https://www.techstars.com/communities/startup-weekend" className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener">
            Fonte: Techstars
          </a>
        </p>
      </div>
    </section>
  );
}
