import type { CityView } from "./view";

export type PinKind = "data" | "attiva" | "in-apertura";

export function pinKind(c: Pick<CityView, "date" | "status">): PinKind {
  if (c.status === "in-apertura") return "in-apertura";
  return c.date ? "data" : "attiva";
}
