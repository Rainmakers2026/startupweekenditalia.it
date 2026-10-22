"use client";

import { useState } from "react";
import { CalendarIcon } from "./Icons";

const GCAL_ID = process.env.NEXT_PUBLIC_GCAL_ID;

/**
 * Facade: l'iframe di Google Calendar si carica solo su click.
 * Niente peso sul caricamento iniziale e niente cookie Google prima che l'utente lo chieda.
 */
export function CalendarEmbed() {
  const [show, setShow] = useState(false);

  if (!GCAL_ID) {
    return (
      <div className="grid h-[420px] place-items-center rounded-2xl border-2 border-dashed border-filo-forte bg-superficie p-6 text-center text-blu-2">
        <p>Il calendario condiviso sarà disponibile a breve.</p>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="grid h-[420px] place-items-center rounded-2xl bg-superficie-alt p-6 text-center">
        <div>
          <CalendarIcon className="mx-auto size-10 text-azzurro-forte" />
          <button type="button" onClick={() => setShow(true)} className="btn-secondary mt-4">
            Mostra il calendario
          </button>
          <p className="mx-auto mt-3 max-w-sm text-xs text-blu-2">
            Il calendario è fornito da Google: caricandolo accetti i cookie di Google.
          </p>
        </div>
      </div>
    );
  }

  const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GCAL_ID)}&ctz=Europe%2FRome&hl=it&mode=AGENDA&showTitle=0&showPrint=0`;
  return <iframe src={src} title="Calendario degli Startup Weekend in Italia" className="h-[420px] w-full rounded-2xl border border-filo" loading="lazy" />;
}
