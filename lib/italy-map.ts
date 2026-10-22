// Proiezione usata per generare public/italia.svg
// (confini regionali ISTAT via openpolis/geojson-italy, CC BY 4.0, semplificati).
// Se si rigenera la mappa, queste costanti devono restare identiche o i pin si spostano.
export const MAP_WIDTH = 446;
export const MAP_HEIGHT = 583;

const LON0 = 6.6;
const LAT1 = 47.1;
const COS = Math.cos((42 * Math.PI) / 180);
const K = 50;

export function project(lat: number, lng: number): { x: number; y: number } {
  return { x: (lng - LON0) * COS * K, y: (LAT1 - lat) * K };
}

