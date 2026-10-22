"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CityView } from "@/lib/view";
import { pinKind } from "@/lib/pin";
import { CityPanel } from "./CityPanel";
import { Close } from "./Icons";

const PIN_STYLE = {
  data: "bg-fuxia-forte ring-fuxia-forte/30",
  attiva: "bg-azzurro-forte ring-azzurro-forte/30",
  "in-apertura": "bg-pagina border-2 border-dashed border-blu-2 ring-transparent",
} as const;

function pinLabel(c: CityView) {
  if (c.special && !c.special.canRegisterOnline) return `${c.name} – ${c.special.label}`;
  return c.date ? `${c.name} – prossimo SW ${c.date.label}` : `${c.name} – data in arrivo`;
}

type Props = { cities: CityView[]; width: number; height: number; children: React.ReactNode };

/**
 * Pin e scheda della mappa. L'SVG dell'Italia arriva già renderizzato dal server come `children`,
 * così il suo peso non finisce nel JavaScript del client.
 * Desktop: la scheda sta nel pannello a lato. Mobile: si apre come bottom sheet (<dialog>).
 */
export function CityMap({ cities, width, height, children }: Props) {
  const initial = cities.find((c) => c.date) ?? cities[0];
  const [selected, setSelected] = useState<string>(initial.slug);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const city = cities.find((c) => c.slug === selected) ?? initial;

  function open(slug: string, trigger: HTMLButtonElement) {
    setSelected(slug);
    triggerRef.current = trigger;
    if (!window.matchMedia("(min-width: 1024px)").matches) dialogRef.current?.showModal();
  }

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => triggerRef.current?.focus();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
      <div>
        <div className="relative mx-auto max-w-[520px]" style={{ aspectRatio: `${width} / ${height}` }}>
          {children}
          <ul>
            {cities.map((c) => {
              const active = c.slug === selected;
              const kind = pinKind(c);
              return (
                <li
                  key={c.slug}
                  className="absolute"
                  style={{ left: `${(c.x / width) * 100}%`, top: `${(c.y / height) * 100}%`, zIndex: active ? 2 : 1 }}
                >
                  <button
                    type="button"
                    onClick={(e) => open(c.slug, e.currentTarget)}
                    aria-label={pinLabel(c)}
                    aria-pressed={active}
                    className="group absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                  >
                    {kind === "data" && <span aria-hidden className="absolute size-3.5 animate-ping rounded-full bg-fuxia-forte/40" />}
                    <span
                      className={`relative block rounded-full ring-4 transition-transform ${PIN_STYLE[kind]} ${
                        active ? "size-4 scale-125" : "size-3.5 group-hover:scale-125"
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-full left-1/2 mt-0.5 -translate-x-1/2 rounded-md px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap ${
                        active
                          ? "bg-blu text-white"
                          : "bg-pagina/90 text-blu opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <Link
            href="/organizza"
            className="absolute bottom-0 left-0 flex items-center gap-2 rounded-full border-2 border-dashed border-blu-2 bg-pagina px-3 py-2 text-sm font-semibold hover:border-fuxia-forte hover:text-fuxia-forte-hover"
          >
            <span aria-hidden className="text-lg leading-none">+</span> La tua città?
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blu-2" aria-label="Legenda">
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 rounded-full bg-fuxia-forte" /> Data confermata
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 rounded-full bg-azzurro-forte" /> Città attiva, data in arrivo
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 rounded-full border-2 border-dashed border-blu-2" /> In apertura
          </li>
        </ul>
      </div>

      <aside className="card hidden lg:sticky lg:top-24 lg:block" aria-live="polite">
        <CityPanel city={city} />
      </aside>

      <dialog
        ref={dialogRef}
        aria-labelledby="city-sheet-title"
        className="m-0 mt-auto max-h-[85vh] w-full max-w-none rounded-t-3xl bg-pagina p-6 pb-10 text-blu backdrop:bg-blu/60 lg:hidden"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="float-right grid size-11 place-items-center rounded-full bg-superficie-alt"
          aria-label="Chiudi"
        >
          <Close />
        </button>
        <CityPanel city={city} headingId="city-sheet-title" />
      </dialog>
    </div>
  );
}
