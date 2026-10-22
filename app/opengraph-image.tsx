import { ImageResponse } from "next/og";
import { cities } from "@/lib/content";

export const alt = "Startup Weekend Italia: trasforma la tua idea in una startup in 54 ore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Anteprima per social e chat (WhatsApp, LinkedIn…), generata in build con i colori del sito. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(900px 600px at 100% 0%, rgba(39,168,232,0.25), transparent 70%), radial-gradient(800px 500px at 0% 100%, rgba(225,81,141,0.25), transparent 70%), #042359",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 36, fontWeight: 700 }}>
          <div style={{ display: "flex", width: 72, height: 72, borderRadius: 16, background: "white", color: "#042359", alignItems: "center", justifyContent: "center" }}>
            SW
          </div>
          <div style={{ display: "flex" }}>
            Startup Weekend&nbsp;<span style={{ color: "#27a8e8" }}>Italia</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          <span>Trasforma la tua idea</span>
          <span>
            in una startup&nbsp;<span style={{ color: "#27a8e8" }}>in 54 ore.</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 30, color: "#a4afc2" }}>
          <div style={{ display: "flex", background: "#d1246c", color: "white", padding: "12px 28px", borderRadius: 999, fontWeight: 700 }}>
            Trova il tuo SW
          </div>
          {cities.length} città in Italia
        </div>
      </div>
    ),
    size,
  );
}
