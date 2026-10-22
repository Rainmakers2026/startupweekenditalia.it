// TODO: sostituire con il logo Startup Weekend ufficiale (public/brand/logo-chiaro.svg e logo-scuro.svg).
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2 font-display text-lg leading-none font-bold">
      <span aria-hidden className={`grid size-9 place-items-center rounded-lg text-sm ${dark ? "bg-white text-blu" : "bg-blu text-white"}`}>
        SW
      </span>
      <span>
        Startup Weekend <span className={dark ? "text-azzurro" : "text-azzurro-forte"}>Italia</span>
      </span>
    </span>
  );
}
