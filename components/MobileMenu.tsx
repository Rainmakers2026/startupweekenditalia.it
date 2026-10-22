"use client";

import { useEffect, useRef } from "react";

/**
 * Menu mobile su <details>: funziona anche senza JavaScript.
 * Lo script aggiunge solo la chiusura dopo un click su un link, con Esc e con un click fuori.
 */
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const close = () => {
      if (el.open) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        close();
        el.querySelector("summary")?.focus();
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) close();
    };
    const onLinkClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickOutside);
    el.addEventListener("click", onLinkClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickOutside);
      el.removeEventListener("click", onLinkClick);
    };
  }, []);

  return (
    <details ref={ref} className="group relative lg:hidden">
      {children}
    </details>
  );
}
