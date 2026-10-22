"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/content";
import { Close } from "./Icons";

/** Galleria con ingrandimento in un <dialog> nativo: focus, Esc e sfondo gestiti dal browser. */
export function Lightbox({ items }: { items: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const photo = current === null ? null : items[current];

  function open(i: number) {
    setCurrent(i);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    setCurrent((i) => (i === null ? i : (i + delta + items.length) % items.length));
  }

  return (
    <>
      <ul className="mt-10 columns-2 gap-3 md:columns-3">
        {items.map((p, i) => (
          <li key={p.src} className="mb-3 break-inside-avoid">
            <figure>
              <button type="button" onClick={() => open(i)} className="block w-full overflow-hidden rounded-2xl" aria-label={`Ingrandisci: ${p.alt}`}>
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform hover:scale-[1.02]" />
              </button>
              {p.credit && <figcaption className="mt-1 text-xs text-blu-2">Foto: {p.credit}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        aria-label="Foto ingrandita"
        className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-blu/90"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClose={() => setCurrent(null)}
      >
        {photo && (
          <figure className="relative">
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="92vw" className="h-auto max-h-[85vh] w-auto rounded-2xl" />
            <figcaption className="mt-2 text-sm text-white">
              {photo.alt}
              {photo.credit ? ` · Foto: ${photo.credit}` : ""}
            </figcaption>
            <div className="absolute top-3 right-3 flex gap-2">
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center rounded-full bg-white text-blu" aria-label="Foto precedente">
                    ←
                  </button>
                  <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center rounded-full bg-white text-blu" aria-label="Foto successiva">
                    →
                  </button>
                </>
              )}
              <button type="button" onClick={() => dialogRef.current?.close()} className="grid size-11 place-items-center rounded-full bg-white text-blu" aria-label="Chiudi">
                <Close />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
