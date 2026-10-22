import Image from "next/image";
import type { Photo } from "@/lib/content";

/** Galleria leggera. Senza foto mostra riquadri "Foto in arrivo": niente foto stock spacciate per eventi. */
export function PhotoGallery({ items, placeholders = 6 }: { items: Photo[]; placeholders?: number }) {
  if (items.length === 0) {
    return (
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3" aria-label="Foto in arrivo">
        {Array.from({ length: placeholders }, (_, i) => (
          <li
            key={i}
            className={`grid place-items-center rounded-2xl bg-superficie-alt text-sm text-blu-2 ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
          >
            Foto in arrivo
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="mt-10 columns-2 gap-3 md:columns-3">
      {items.map((p) => (
        <li key={p.src} className="mb-3 break-inside-avoid">
          <figure>
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full rounded-2xl"
            />
            {p.credit && <figcaption className="mt-1 text-xs text-blu-2">Foto: {p.credit}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
