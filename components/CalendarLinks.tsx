import { CalendarIcon } from "./Icons";

const GCAL_ID = process.env.NEXT_PUBLIC_GCAL_ID;

export function CalendarLinks() {
  if (!GCAL_ID) {
    return <p className="mt-6 text-sm text-blu-2">I link per iscriversi al calendario saranno attivi a breve.</p>;
  }
  const id = encodeURIComponent(GCAL_ID);
  const ics = `calendar.google.com/calendar/ical/${id}/public/basic.ics`;
  return (
    <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <li>
        <a href={`https://calendar.google.com/calendar/u/0/r?cid=${id}`} target="_blank" rel="noopener" className="btn-primary w-full sm:w-auto">
          <CalendarIcon className="size-4" /> Aggiungi a Google Calendar
        </a>
      </li>
      <li>
        <a href={`webcal://${ics}`} className="btn-secondary w-full sm:w-auto">
          Iscriviti da Apple / Outlook
        </a>
      </li>
      <li>
        <a href={`https://${ics}`} className="btn-secondary w-full sm:w-auto" download>
          Scarica .ics
        </a>
      </li>
    </ul>
  );
}
