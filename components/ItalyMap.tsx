import type { CityView } from "@/lib/view";
import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/italy-map";
import { CityMap } from "./CityMap";

/** La sagoma dell'Italia è un file statico in cache: non pesa sull'HTML né sul JavaScript. */
export function ItalyMap({ cities }: { cities: CityView[] }) {
  return (
    <CityMap cities={cities} width={MAP_WIDTH} height={MAP_HEIGHT}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/italia.svg"
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        alt="Mappa dell'Italia con le città degli Startup Weekend. L'elenco completo delle città è più sotto nella pagina."
        className="absolute inset-0 size-full"
        decoding="async"
      />
    </CityMap>
  );
}
