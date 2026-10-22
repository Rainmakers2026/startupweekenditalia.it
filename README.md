# startupweekenditalia.it

Sito nazionale di **Startup Weekend Italia**: mappa delle città, date, calendario condiviso, referenti, form per aprire uno SW, FAQ, stampa.
La specifica completa è in [PRD.md](PRD.md).

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Airtable · Resend · Cloudflare Turnstile.

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # poi compila le variabili
npm run dev                  # http://localhost:3000
```

Senza variabili d'ambiente il sito funziona lo stesso: i referenti arrivano da `content/cities.json`, le email vengono scritte nei log invece di essere inviate, calendario e newsletter mostrano "in arrivo".

## Aggiornare i contenuti (senza toccare il codice)

Tutti i testi variabili sono in `content/`. Ogni file viene validato in build: se c'è un errore il deploy si ferma invece di pubblicare una pagina rotta.

| File | Cosa contiene |
|---|---|
| `cities.json` | Città, coordinate, sito, link biglietti, social, **prossima edizione**, particolarità (es. Rimini Youth), referenti iniziali |
| `faq.json` | FAQ (`audience`: `partecipanti` o `organizzatori`) |
| `startups.json` | Startup nate agli SW |
| `press.json` | Rassegna stampa |
| `media-partners.json` | Media partner |
| `photos.json` | Foto (file in `public/foto/<città>/`, con `alt`, `width`, `height`, `credit`) |
| `social.json` | Profili social nazionali (`null` = non mostrato) |
| `site.json` | Nome, URL, email generale, link al press kit |

**Aggiungere una data:** in `cities.json` compila `nextEdition.startDate` e `endDate` (formato `AAAA-MM-GG`). Il pin diventa fucsia, la data compare in tabella, nella scheda della mappa e nella pagina città, e si attiva il file `.ics`. Passata la data, la città torna automaticamente "data in arrivo".

**Aggiungere una città:** nuovo oggetto in `cities.json` con `slug`, `name`, `region`, `coords` (lat/lng del centro). La pagina `/citta/<slug>` si genera da sola e il pin si posiziona sulla mappa.

## Airtable

Crea una base con due tabelle.

**Referenti**

| Campo | Tipo |
|---|---|
| Nome | Single line text |
| Cognome | Single line text |
| Email | Email |
| Telefono | Phone |
| Città | Single select (valori = gli `slug` di `cities.json`, più `altra`) |
| Altra città | Single line text |
| Ruolo | Single select: `Referente attivo`, `Vuole aprire uno SW` |
| Esperienza | Long text |
| Visibile sul sito | Checkbox, **spuntata di default** |
| Consenso pubblicazione nome | Checkbox |

**Contatti**: Nome, Email, Città, Motivo, Messaggio (testo), più eventualmente Stato.

Il sito legge da Airtable **solo** Nome, Cognome e Città dei record con "Visibile sul sito" spuntato: email e telefono non escono mai da Airtable. Dopo un invio dal form il nome compare subito; le modifiche fatte a mano in Airtable compaiono entro 5 minuti, oppure subito se un'automazione Airtable chiama `POST /api/revalidate?secret=<REVALIDATE_SECRET>`.

Per moderare i nomi prima che compaiano, togli il default dalla checkbox "Visibile sul sito".

Il token Airtable serve con i permessi `data.records:read` e `data.records:write` sulla sola base del sito.

## Variabili d'ambiente

Vedi [.env.example](.env.example). Le email di notifica dei form vanno a `MAIL_TO_NOX` e `MAIL_TO_MARCO`.

## Deploy

Pensato per Vercel: importa il repository, imposta le variabili d'ambiente, fatto. Dominio: `startupweekenditalia.it`.

## Cose ancora da fornire

- Link ai siti degli SW cittadini (oggi "Lorem ipsum", tranne Padova) e link biglietti
- Date confermate (Padova 6–8 novembre 2026 è **da confermare**)
- Cognome di Rossella (Parma)
- Email reali di Nox, Marco e dell'indirizzo generale
- ID del Google Calendar pubblico, provider newsletter
- Social, rassegna stampa, media partner, foto, startup nate agli SW
- Logo ufficiale Startup Weekend (`public/brand/`) e testi legali di privacy e cookie

## Crediti

Confini della mappa: ISTAT via [openpolis/geojson-italy](https://github.com/openpolis/geojson-italy), licenza CC BY 4.0.
