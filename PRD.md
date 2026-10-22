# PRD — startupweekenditalia.it

> Documento di specifica da dare a Claude Code per costruire il sito nazionale di **Startup Weekend Italia (SWI)**.
> Lingua del sito: **solo italiano**. Versione 1.0 — 22/10/2026.

---

## 0. Istruzioni per Claude Code (leggere per prime)

1. **Non inventare dati.** Nomi, date, testate, startup, numeri, citazioni e foto vanno presi solo da questo documento o dai file in `/content`. Dove manca un dato usa il placeholder esplicito `Lorem ipsum` (testi) o `#` + `TODO` (link), e marca il punto con il commento `{/* TODO: dato da fornire */}`.
2. **Tutti i contenuti stanno in file dati** (`/content/*.json` o `*.ts`), mai scritti nei componenti: così il team può aggiornarli senza toccare il codice.
3. **Prestazioni prima di tutto**: obiettivo Lighthouse ≥ 95 in tutte e quattro le categorie, su mobile. Ogni scelta tecnica sotto va in questa direzione (niente librerie mappa pesanti, embed Google caricati solo su richiesta).
4. Lavora per fasi (§14) e verifica i criteri di accettazione (§15) alla fine di ognuna.

---

## 1. Contesto

**Startup Weekend** è un format globale di Techstars: un evento di **54 ore** (da venerdì sera a domenica sera) in cui chiunque presenta un'idea in 60 secondi, si formano squadre, si costruisce un prototipo/MVP con l'aiuto di mentor e la domenica si presenta a una giuria. Riferimento del format: <https://www.techstars.com/communities/startup-weekend>.

In Italia gli Startup Weekend sono organizzati da community cittadine indipendenti e volontarie. Oggi manca un punto di accesso unico: chi vuole partecipare non sa dove e quando c'è il prossimo evento, e chi vuole organizzarne uno non sa a chi rivolgersi.

### Obiettivi del sito
| # | Obiettivo | Come lo misuriamo |
|---|---|---|
| O1 | Aumentare **awareness** e **partecipanti** degli SW cittadini | Click verso i siti/biglietti delle città, iscrizioni newsletter, download calendario |
| O2 | **Aiutare gli organizzatori** (attuali e nuovi) | Form "Apri uno SW" inviati, FAQ consultate |
| O3 | **Accreditare** il network verso partner, media e istituzioni | Visite a Rassegna stampa / Media partner, contatti ricevuti |

### Pubblici
1. **Partecipanti potenziali** (studenti universitari, professionisti, designer, sviluppatori, curiosi) → "dove e quando è il prossimo SW vicino a me?"
2. **Aspiranti organizzatori** → "come apro uno SW nella mia città?"
3. **Organizzatori attivi** → risorse, FAQ, visibilità.
4. **Partner, sponsor, media, istituzioni** → credibilità, numeri, contatti.

---

## 2. Identità visiva (ripresa da startupweekendpadova.it)

Lo stile deve essere coerente con il sito di Startup Weekend Padova. I valori seguenti sono stati estratti dal suo foglio di stile.

### 2.1 Colori (token CSS)
```css
:root {
  /* Blu – colore istituzionale, fondi scuri, testo */
  --color-blu: #042359;
  --color-blu-hover: #031e4c;
  --color-blu-su-azzurro: #08336a;
  --color-blu-2: #4f6489;
  --color-blu-3: #5e7093;

  /* Azzurro – accento, link, fondi sezione */
  --color-azzurro: #27a8e8;
  --color-azzurro-hover: #2397d1;
  --color-azzurro-forte: #1171a1;      /* usare per testo su bianco (contrasto AA) */
  --color-azzurro-forte-hover: #0e5e86;

  /* Fucsia – CTA principali */
  --color-fuxia: #e1518d;
  --color-fuxia-hover: #ca497f;
  --color-fuxia-forte: #d1246c;        /* bottoni pieni con testo bianco */
  --color-fuxia-forte-hover: #b71f5f;
  --color-fuxia-chiaro: #f07fab;
  --color-fuxia-tenue: #fbeaf1;

  /* Neutri */
  --color-pagina: #ffffff;
  --color-superficie: #fafafa;
  --color-superficie-alt: #ebedf2;
  --color-filo: #e6e9ee;
  --color-filo-forte: #d3dae4;
  --color-bianco: #fafafa;
  --color-bianco-2: #a4afc2;
  --color-bianco-3: #8b99b2;

  /* Stati */
  --color-errore: #c42348;
  --color-errore-chiaro: #ff7a8f;
}
```
**Regole d'uso**
- Sezioni alternate con fondo `pagina` / `superficie` / `blu` (sezioni "forti", testo `bianco`) / `azzurro` (testo `blu`).
- CTA primaria = bottone pieno `fuxia-forte` + testo bianco. CTA secondaria = bordo/testo `blu` su chiaro, o bianco su scuro.
- Tutte le coppie testo/fondo devono rispettare **WCAG AA** (4.5:1 testo normale). `azzurro` (#27a8e8) **non** va usato come colore del testo su bianco: usare `azzurro-forte`.
- Pin mappa: città con data confermata = `fuxia-forte`; città attiva senza data = `azzurro-forte`; città "in apertura" = contorno `blu-2`.

### 2.2 Tipografia
- **Display / titoli**: `Stack Sans Notch` → fallback `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- **Testo**: `Mona Sans` (variabile) → fallback `ui-sans-serif, system-ui, sans-serif`.
- Pesi: 500 / 600 / 700.
- Caricamento **self-hosted** con `next/font/local` (o `next/font/google` se disponibili), `font-display: swap`, solo i sottoinsiemi latini, preload solo del font display. Nessuna richiesta a fonts.googleapis.com a runtime.

### 2.3 Tono di voce
Come Padova: **energico, diretto, informale, si dà del "tu"**.
- Titoli brevi e incisivi, spesso domande o affermazioni nette. Es.: *"Trasforma la tua idea in una startup in 54 ore."*, *"Non è un corso. È un weekend che ti cambia il curriculum."*
- Contrasti e frasi brevi; numeri come gancio (54 ore, 3 giorni, 60 secondi).
- Lessico startup in inglese dove è naturale (pitch, team, MVP, mentor), il resto in italiano chiaro.
- CTA all'imperativo con freccia: *"Trova il tuo SW →"*, *"Apri uno SW nella tua città →"*.
- **Niente urgenza finta** sul sito nazionale (no "ultimi biglietti" se non è vero).

### 2.4 Logo
Usare il logo Startup Weekend nelle varianti chiara/scura fornite dal team (`/public/brand/logo-chiaro.svg`, `/public/brand/logo-scuro.svg`). Finché non arrivano, placeholder testuale "Startup Weekend Italia". Rispettare le linee guida di brand Techstars.

---

## 3. Stack tecnico

| Area | Scelta | Motivo |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Stesso stack di SW Padova, SSG/ISR |
| Stile | **Tailwind CSS v4** con i token del §2.1 | Coerenza con Padova, CSS minimo |
| Rendering | Pagine statiche (SSG). Lista referenti con **ISR** (`revalidate: 300`) + revalidate on-demand | Velocità + aggiornamento automatico |
| Hosting | **Vercel** (o Netlify) | Deploy semplice, edge cache |
| Dati referenti / form | **Airtable** via API REST, chiamata **solo lato server** | Il team gestisce i dati senza codice |
| Email di notifica | **Resend** (o automazione Airtable "Send email") | Notifica a Nox / Marco |
| Antispam | Honeypot + **Cloudflare Turnstile** | Leggero, senza cookie di profilazione |
| Mappa | **SVG inline dell'Italia** con pin posizionati da coordinate | Zero dipendenze pesanti, accessibile, Lighthouse alto |
| Calendario | Google Calendar pubblico: link iCal + embed caricato su click | Nessun iframe al caricamento |
| Analytics | **Plausible** o Vercel Analytics (cookieless) | Niente banner cookie obbligatorio per l'analytics |
| Newsletter | Placeholder provider (Brevo / Mailchimp / Substack) via env | Da decidere |

### Variabili d'ambiente (`.env.example`)
```
AIRTABLE_API_TOKEN=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_REFERENTI=Referenti
AIRTABLE_TABLE_CONTATTI=Contatti
RESEND_API_KEY=
MAIL_TO_NOX=nox@placeholder.it          # TODO: mail reale
MAIL_TO_MARCO=marco@placeholder.it      # TODO: mail reale
MAIL_FROM=noreply@startupweekenditalia.it
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
REVALIDATE_SECRET=
NEXT_PUBLIC_GCAL_ID=TODO@group.calendar.google.com
NEXT_PUBLIC_NEWSLETTER_ACTION=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=startupweekenditalia.it
```

---

## 4. Architettura dell'informazione

Sito **one-page principale** (la home contiene tutti i blocchi chiave, per SEO e semplicità) + **una pagina per città** + pagine di servizio.

```
/                          Home (one-page con ancore)
/citta/[slug]              Pagina città (es. /citta/rimini)
/calendario                Calendario completo + tabella + download
/organizza                 Apri uno SW nella tua città (form 3 step + FAQ organizzatori)
/stampa                    Rassegna stampa + media partner + press kit
/startup                   Startup nate agli SW (filtro per città/anno)
/faq                       Tutte le FAQ
/contatti                  Form contatto / segnalazione
/privacy  /cookie          Pagine legali
```

### Navigazione (header sticky, compatto)
`Città` · `Calendario` · `Organizza` · `Startup` · `Stampa` · `FAQ` · CTA fucsia **"Trova il tuo SW →"** (scorre alla mappa).
Su mobile: menu a scomparsa accessibile (focus trap, `Esc` per chiudere).

### Ordine dei blocchi in Home (ottimizzato per conversione e performance)
1. **Hero**
2. **Mappa delle città** (cuore del sito)
3. **Prossimi SW** (tabella/lista + calendario)
4. **Come funziona** (54 ore in 3 fasi)
5. **Tutte le città** (griglia con link a sito cittadino e referenti)
6. **Apri uno SW nella tua città** (teaser + CTA verso `/organizza`)
7. **Startup nate agli SW** (teaser)
8. **Foto dagli eventi**
9. **Dicono di noi / Media partner**
10. **FAQ** (le 5–6 principali)
11. **Newsletter + Social**
12. **Footer**

Motivo: chi arriva vuole subito "dove e quando" → mappa e date in alto. I blocchi pesanti (foto, embed) stanno sotto la piega e si caricano in modo differito.

---

## 5. Dati delle città

### 5.1 File `/content/cities.json`
Ogni città è un oggetto con questo schema:

```ts
type City = {
  slug: string;                 // "padova"
  name: string;                 // "Padova"
  region: string;               // "Veneto"
  coords: { lat: number; lng: number };
  status: "attiva" | "in-apertura";
  website: string | null;       // null → mostra "Lorem ipsum" e nessun link
  ticketUrl: string | null;
  social: { instagram?: string; linkedin?: string; facebook?: string };
  nextEdition: {
    startDate: string | null;   // ISO "2026-11-06"; null = data non ancora fissata
    endDate: string | null;
    venue: string | null;
    edition: number | null;     // n° edizione
    note: string | null;
  };
  special: {                    // particolarità del format (opzionale)
    label: string;              // es. "Youth – solo scuole superiori"
    description: string;
    canRegisterOnline: boolean;
  } | null;
  referentiStatic: string[];    // referenti iniziali (vedi 5.2); quelli da Airtable si aggiungono
  pastEditions: { year: number; edition?: number; url?: string }[];
};
```

### 5.2 Città e referenti iniziali
Dati forniti dal team. Il campo `website` è `null` per tutte finché il team non fornisce la lista link: **mostrare "Lorem ipsum" al posto del link**.

| Città | Regione | Referenti | Sito |
|---|---|---|---|
| Bari | Puglia | Annalisa Ghebbioni, Diego Antonacci, Davide Montrone, Sabrina Turturro | Lorem ipsum |
| Lecco | Lombardia | Marcello Berera, Giovanni Vanini | Lorem ipsum |
| Mantova | Lombardia | Nox | Lorem ipsum |
| Milano | Lombardia | Nox | Lorem ipsum |
| Padova | Veneto | Eda Fetahu, Chiara Morandin | https://www.startupweekendpadova.it |
| Parma | Emilia-Romagna | Veronica Pinetti, Rossella *(cognome da completare)* | Lorem ipsum |
| Pavia | Lombardia | Claudia Lupu | Lorem ipsum |
| Pescara | Abruzzo | Federico Bonetti | Lorem ipsum |
| Reggio Emilia | Emilia-Romagna | Elena Galli, Giacomo Cacciamani | Lorem ipsum |
| Rimini | Emilia-Romagna | Diego De Simone | Lorem ipsum |
| Roma | Lazio | Erika Lucciola | Lorem ipsum |
| Savona | Liguria | Eleonora Servodio, Emma Vitiello | Lorem ipsum |
| Siena | Toscana | Marco D'Angelo | Lorem ipsum |

> **Decisione del team:** i link dei siti cittadini non sono disponibili, quindi per tutte le città tranne Padova si mostra il testo "Lorem ipsum", senza link. Quando arriveranno basterà inserirli nel campo `website` di `cities.json`. Il sito di Padova è stato verificato online.

Coordinate: usare le coordinate del centro città (Claude Code può inserirle; sono dati geografici pubblici, non contenuti inventati).

### 5.3 Date delle prossime edizioni
Nessuna data è confermata nel brief, quindi tutte le `nextEdition.startDate` partono a `null`, tranne:
- **Padova**: su Eventbrite risulta un evento venerdì **6 novembre 2026, ore 18:00**, Campus di Biologia e Biomedicina "Fiore di Botta", Università di Padova. **Da confermare con il team prima della pubblicazione** (inserirla con `note: "da confermare"` finché non arriva l'ok).
- **Rimini**: 7ª edizione, **fine aprile / maggio 2027**. `startDate: null`, `edition: 7`, `note: "Fine aprile / maggio 2027"`.

### 5.4 Caso speciale: Rimini — Startup Weekend Youth
Testo da usare (nell'infografica del pin e nella pagina città):

> **Startup Weekend Youth — solo per studenti delle scuole superiori.**
> A Rimini lo SW è dedicato esclusivamente agli studenti delle superiori. La selezione funziona in due passaggi: il team organizzativo seleziona le scuole del territorio e poi, con il nostro supporto, sono le scuole a selezionare gli studenti.
> **Non è possibile iscriversi dal sito.** Se sei un docente o un dirigente scolastico e vuoi coinvolgere la tua scuola, contatta il team di Rimini.
> La partecipazione è **gratuita** per scuole e studenti, grazie ai partner locali che sostengono l'iniziativa.
> *Nota: Techstars da alcuni anni non ammette la partecipazione di minori per motivi di privacy e compliance; per Rimini è stata concessa un'eccezione, di cui gli organizzatori locali si assumono la responsabilità.*
> 7ª edizione: fine aprile / maggio 2027.

Nei dati: `special = { label: "Youth · scuole superiori", canRegisterOnline: false, description: "…" }`.
Effetto in UI: badge "Youth" sul pin e sulla card; **nessuna CTA "Iscriviti"**, al suo posto **"Sei una scuola? Contattaci →"** (apre il form contatti con città = Rimini e motivo = "Scuola interessata").

Il campo `special` è generico: qualunque altra città con particolarità di format potrà usarlo.

---

## 6. Specifiche delle sezioni

### 6.1 Hero
- H1: **"Trasforma la tua idea in una startup in 54 ore."**
- Sottotitolo: *"Startup Weekend è il format di Techstars in cui pitchi un'idea, formi un team e costruisci una startup in un weekend. In Italia siamo in {N} città: trova la tua."* ({N} calcolato da `cities.json`).
- CTA primaria: **"Trova il tuo SW →"** (scroll alla mappa). CTA secondaria: **"Apri uno SW nella tua città"** → `/organizza`.
- Striscia numeri: solo numeri verificabili e calcolati dai dati: `{N} città`, `54 ore`, `3 giorni`. Numeri globali Techstars citabili con fonte (7K+ eventi, 150+ paesi, dalla pagina Techstars Startup Weekend). **Nessun numero italiano inventato** (partecipanti, startup nate…): placeholder `Lorem ipsum` finché il team non li fornisce.
- Hero senza immagini pesanti: fondo `blu` con elemento grafico SVG/CSS. Se si usa una foto, `next/image` con `priority`, AVIF/WebP, max 120 KB.

### 6.2 Mappa delle città (componente `ItalyMap`)
- **SVG inline dell'Italia** (sagoma semplificata, < 30 KB, da fonte open data con licenza compatibile — citarla nel footer). Proiezione semplice lat/lng → x/y calibrata sui confini dell'SVG.
- Un **pin** per città, colore per stato (§2.1). Accanto/sotto la mappa una **legenda**.
- **Interazione**: click/tap o `Invio` sul pin apre una **scheda (infografica)**:
  - su desktop: popover ancorato al pin;
  - su mobile: bottom sheet a tutta larghezza.
- **Contenuto della scheda**:
  - Nome città + regione + badge eventuale (`special.label`).
  - **Se `nextEdition.startDate` esiste**: data (es. "6–8 novembre 2026"), luogo, n° edizione, countdown in giorni, CTA **"Prendi il biglietto →"** (`ticketUrl`) e **"Aggiungi al calendario"** (file .ics generato per l'evento).
  - **Se la data non c'è**: testo *"La prossima edizione è in preparazione."* + CTA **"Voglio partecipare →"** (iscrizione newsletter con città preselezionata, così l'utente viene avvisato) + link **"Dai una mano a organizzarla"** → `/organizza?citta={slug}`.
  - **Se `canRegisterOnline === false`** (Rimini): testo speciale del §5.4, niente CTA biglietto.
  - Referenti (solo nome e cognome), link al sito della città (o "Lorem ipsum"), social, link **"Vai alla pagina della città →"** (`/citta/{slug}`).
- **Accessibilità**: ogni pin è un `<button>` con `aria-label="Padova – prossimo SW 6 novembre 2026"`; la scheda è un `dialog` con focus gestito; `Esc` chiude. **Sotto la mappa, alternativa testuale**: elenco città (la griglia del §6.5 assolve a questo ruolo) — la mappa non deve essere l'unico modo per arrivare ai contenuti.
- La mappa include anche un pin tratteggiato **"La tua città?"** che porta a `/organizza`.

### 6.3 Prossimi SW (tabella) + Calendario Google
Due strumenti separati, come richiesto.

**Tabella/lista "Prossimi Startup Weekend"** (generata da `cities.json`, quindi sempre coerente con la mappa):
- Colonne: Data · Città · Luogo · Edizione · Azione (Biglietti / Info / "Solo scuole").
- Ordinata per data; le città senza data in fondo con "Data in arrivo".
- Su mobile diventa una lista di card.
- Filtro per regione (opzionale, JS minimo).

**Calendario condiviso Google** (`/calendario` + blocco in home):
- Un calendario Google **pubblico** gestito dal team (`NEXT_PUBLIC_GCAL_ID`), con tutti gli SW italiani.
- Bottoni:
  - **"Aggiungi a Google Calendar"** → `https://calendar.google.com/calendar/u/0/r?cid={GCAL_ID}`
  - **"Iscriviti da Apple / Outlook (iCal)"** → `webcal://calendar.google.com/calendar/ical/{GCAL_ID}/public/basic.ics`
  - **"Scarica .ics"** → stesso URL in `https://`.
- **Embed del calendario** (`iframe` Google) **solo su click** ("Mostra il calendario"), con segnaposto statico della stessa altezza (niente CLS). Così l'iframe non pesa su Lighthouse né carica cookie Google prima del consenso.
- Testo: *"Vuoi girare l'Italia a colpi di Startup Weekend? Aggiungi il calendario e non perdi nessuna data."*

### 6.4 Come funziona
Tre colonne / step (da Padova e dal format ufficiale):
1. **Venerdì — Pitch**: presenti la tua idea in 60 secondi, si votano le migliori, si formano i team.
2. **Sabato — Build**: lavori con il team, validi l'idea con clienti veri, costruisci l'MVP con l'aiuto dei mentor.
3. **Domenica — Demo**: presenti il progetto alla giuria. Si premiano i migliori team.

Sotto: "Cosa ottieni" (network, competenze pratiche, mentor, un'esperienza da curriculum). Nessun dato numerico non verificato.

### 6.5 Tutte le città (griglia)
- Card per città, ordine alfabetico: nome, regione, badge stato/particolarità, prossima data o "Data in arrivo", **referenti (nome cognome, aggiornati automaticamente da Airtable — §7)**, link **"Sito di {città} ↗"** (o testo "Lorem ipsum" senza link), icone social, link a `/citta/{slug}`.
- Questa griglia è il **"link a tutti i siti degli SW cittadini"** ed è anche l'alternativa accessibile alla mappa.
- Card finale: **"Non vedi la tua città? Portala tu →"** (`/organizza`).

### 6.6 Pagina città `/citta/[slug]`
Generata staticamente da `cities.json`:
- Hero con nome città, prossima edizione o "in preparazione", CTA coerenti con §6.2.
- Blocco particolarità (`special`), se presente.
- Referenti (ISR da Airtable).
- Edizioni passate, startup nate (filtrate dal file del §6.9), foto della città (§6.10).
- Link al sito cittadino e social.
- Metadati SEO dedicati (`title`: "Startup Weekend {Città} — prossima edizione e info"), dati strutturati `Event` se c'è una data.

### 6.7 Apri uno SW nella tua città (`/organizza`)
- Titolo: **"Nella tua città non c'è uno Startup Weekend? Aprilo tu."**
- Breve spiegazione: cosa significa organizzare (team di volontari, rapporto con Techstars, facilitatore, partner locali), cosa offre il network italiano (affiancamento, esperienza delle altre città, rilancio sui media partner).
- **Form in 3 step** (§7.2) → arriva a **Nox / Marco**.
- FAQ per organizzatori (§6.12).

### 6.8 Contatti / segnalazioni (`/contatti`)
Form unico, più corto, con un campo **"Motivo"**:
- "Segnalo uno Startup Weekend che non vedo sul sito"
- "Sono disponibile ad aprirne uno" (→ suggerisce di usare il form `/organizza`)
- "Sono una scuola interessata (Rimini Youth)"
- "Partnership / sponsorizzazione"
- "Media / stampa"
- "Altro"

Campi: Nome*, Email*, Città, Motivo*, Messaggio*, consenso privacy*. Salvataggio in Airtable tabella `Contatti` + email a `MAIL_TO_NOX` e `MAIL_TO_MARCO`.

### 6.9 Startup nate agli SW (`/startup` + teaser in home)
- File `/content/startups.json`: `{ name, city, year, description, website?, logo? }`.
- **Inizialmente vuoto o con 3 voci placeholder chiaramente marcate** ("Lorem ipsum startup", città reale, descrizione lorem ipsum, nessun link). Nessun nome di startup inventato.
- Filtri per città e anno. Se il file è vuoto la sezione mostra: *"Stiamo raccogliendo le storie delle startup nate agli SW. La tua è una di queste? Scrivici →"*.

### 6.10 Foto dagli eventi
- Galleria a griglia (masonry leggero via CSS), cartella `/public/foto/{slug}/`, metadati in `/content/photos.json` (`src, city, year, alt, credit`).
- Tutte con `next/image`, `loading="lazy"`, AVIF/WebP, `sizes` corretti, `alt` descrittivo obbligatorio.
- Lightbox accessibile (senza librerie pesanti; `<dialog>` nativo).
- Placeholder: riquadri grigi `superficie-alt` con didascalia "Foto in arrivo". **Non usare foto stock spacciate per foto degli eventi.**

### 6.11 Rassegna stampa e Media partner (`/stampa` + teaser in home)
**Rassegna stampa** — file `/content/press.json`: `{ outlet, title, date, url, city?, logo? }`.
- Voci iniziali **solo placeholder**: testata "Lorem ipsum", titolo "Lorem ipsum dolor sit amet", data e link vuoti. Nessuna testata reale finché il team non fornisce gli articoli.
- Card con logo testata (scala di grigi, colore al hover), titolo, data, città.

**Media partner** — file `/content/media-partners.json`: `{ name, logo, url, cities: string[] | "tutte" }`.
- Nel brief non ci sono ancora testate confermate: **sezione con 4–6 slot placeholder** ("Media partner — Lorem ipsum").
- Testo: *"Ogni Startup Weekend cittadino viene rilanciato dai nostri media partner. Sei una testata e vuoi sostenere l'innovazione dal basso? Diventa media partner →"* (form contatti, motivo "Media / stampa").

**Press kit**: link a cartella scaricabile (logo, descrizione, foto) — placeholder `#`.

### 6.12 FAQ
Accordion con `<details>/<summary>` (nessun JS), dati in `/content/faq.json` con campo `audience: "partecipanti" | "organizzatori"`. Dati strutturati `FAQPage`.

**Partecipanti** (testi brevi, generici, basati sul format ufficiale):
- Cos'è uno Startup Weekend?
- Devo avere un'idea per partecipare? (No: puoi unirti a un team.)
- Non so programmare, posso partecipare? (Sì: servono anche design, marketing, business.)
- Quanto costa? (Dipende dalla città: vedi la pagina della città. Rimini Youth è gratuito per scuole e studenti.)
- I minorenni possono partecipare? (In generale no, per le regole Techstars; eccezione: Rimini Youth, solo tramite le scuole.)
- Come resto aggiornato sulle date? (Calendario + newsletter.)

**Organizzatori** — includere obbligatoriamente questa FAQ, riscritta dalla discussione interna del gruppo:

> **Con 80 partecipanti, quante persone servono nel team operativo?**
> Dipende da quanto è esperto il team e da quanto vuoi coinvolgere volontari per farli appassionare alla causa e alla community.
> Se guardi solo all'operatività (accrediti, catering, allestimento sale…), **bastano 3 persone in gamba più il facilitatore**: c'è chi l'ha fatto anche in 2 + 1.
> Tieni conto che le attività che portano via più tempo durante l'evento sono quelle di **comunicazione**: chi si occupa di foto, video e interviste va contato a parte.
> Se invece vuoi far crescere la community locale, coinvolgere più volontari è un investimento: è così che si formano i futuri organizzatori.

Altre FAQ organizzatori (con risposta `Lorem ipsum` finché il team non le fornisce): "Come si diventa organizzatori ufficiali Techstars?", "Quanto tempo prima bisogna iniziare a organizzare?", "Come si trovano sponsor e partner locali?", "Chi è il facilitatore e come si trova?".

### 6.13 Newsletter
Sì, serve: è il modo per "convertire" chi trova una città senza data.
- Campi: email*, città di interesse (select da `cities.json`, opzionale, multipla), consenso*.
- Double opt-in gestito dal provider (Brevo consigliato: europeo, GDPR). Endpoint in `NEXT_PUBLIC_NEWSLETTER_ACTION`; finché è vuoto il form mostra uno stato "In arrivo".
- Testo: *"Ti scriviamo solo quando c'è uno Startup Weekend nella tua zona. Niente spam."*

### 6.14 Social
File `/content/social.json` per i profili nazionali (Instagram, LinkedIn, Facebook, YouTube, TikTok). Tutti **placeholder `#`** finché non vengono forniti; le icone con `href="#"` vanno nascoste in produzione o mostrate come "in arrivo" (nessun link morto in produzione). Icone SVG inline (no icon font).

### 6.15 Footer
Logo, una frase di posizionamento, link rapidi, contatti (email placeholder `info@startupweekenditalia.it` — TODO), social, newsletter compatta, menzione *"Startup Weekend è un programma Techstars. Questo sito è curato dalla community italiana degli organizzatori."*, privacy, cookie, crediti mappa.

---

## 7. Form e integrazione Airtable

### 7.1 Base Airtable — tabelle

**Tabella `Referenti`**
| Campo | Tipo | Note |
|---|---|---|
| Nome | Testo | pubblico |
| Cognome | Testo | pubblico |
| Email | Email | **privato** |
| Telefono | Telefono | **privato** |
| Città | Single select (slug delle città) + opzione "Altra città" | |
| Altra città | Testo | se città non in elenco |
| Ruolo | Single select: "Referente attivo" / "Vuole aprire uno SW" | |
| Esperienza | Testo lungo | step 3 |
| Visibile sul sito | Checkbox, **default spuntato** | permette al team di nascondere un nome |
| Consenso pubblicazione nome | Checkbox | obbligatorio |
| Creato il | Created time | |

**Tabella `Contatti`**: Nome, Email, Città, Motivo, Messaggio, Creato il, Stato (Nuovo / Gestito).

### 7.2 Form "Apri / organizza uno SW" — 3 step
Componente client leggero (React state, validazione con `zod`), barra di avanzamento "Step 1 di 3".

1. **Chi sei** — Nome*, Cognome*
2. **Come ti contattiamo** — Email*, Telefono* (formato italiano/internazionale)
3. **Dove** — Città in cui organizzi lo SW* (select con le città esistenti + "Altra città" → campo testo), Ruolo* ("Faccio già parte del team di una città" / "Voglio aprire uno SW in una nuova città"), Esperienza/motivazione (facoltativo), consenso privacy*, consenso a pubblicare **solo nome e cognome** sul sito*.

Tutti i campi richiesti dal brief (nome, cognome, email, telefono, città) sono obbligatori.

**Flusso all'invio**
1. `POST /api/referenti` (Route Handler, runtime Node).
2. Verifica Turnstile + honeypot + rate limit (es. 5 invii/ora per IP).
3. Validazione `zod` lato server.
4. Creazione record in Airtable.
5. Email di notifica a **Nox** e **Marco** (`MAIL_TO_NOX`, `MAIL_TO_MARCO`, placeholder) con tutti i dati.
6. Email di conferma all'utente.
7. `revalidateTag("referenti")` → la pagina si aggiorna e **nome e cognome compaiono automaticamente** nella città scelta (card, pin, pagina città).
8. Messaggio di successo: *"Grazie {Nome}! Ti abbiamo scritto una mail. Nox e Marco ti contatteranno a breve."*

### 7.3 Visualizzazione automatica dei referenti
- Funzione server `getReferenti()` che legge Airtable con filtro `{Visibile sul sito} = TRUE()` e **richiede solo i campi `Nome`, `Cognome`, `Città`** (`fields[]=` nella query): email e telefono non devono mai arrivare al client né alla build.
- Cache con `fetch(..., { next: { tags: ["referenti"], revalidate: 300 } })`: aggiornamento immediato dopo l'invio e comunque ogni 5 minuti (copre le modifiche fatte a mano in Airtable).
- Endpoint `POST /api/revalidate?secret=…` richiamabile da un'automazione Airtable, per aggiornare subito dopo modifiche manuali.
- Unione con `referentiStatic` di `cities.json`, deduplica per nome+cognome (case-insensitive), ordine alfabetico.
- Le iscrizioni con "Altra città" non compaiono sulla mappa: il team crea la nuova città in `cities.json` (stato `in-apertura`).
- Se Airtable non risponde, il sito mostra i `referentiStatic` (nessun errore visibile).

> **Nota per il team:** la pubblicazione è automatica come richiesto. Il rischio è che compaiano nomi falsi o spam; Turnstile, rate limit e la checkbox "Visibile sul sito" servono a gestirlo. Se preferite moderare prima di pubblicare, basta mettere la checkbox **non spuntata** di default.

---

## 8. Performance (obiettivo Lighthouse ≥ 95, mobile)

| Metrica | Obiettivo |
|---|---|
| LCP | < 2,0 s (4G simulato) |
| CLS | < 0,05 |
| INP | < 200 ms |
| JS iniziale home | < 90 KB gzip |
| Peso home (sopra la piega) | < 400 KB |

Regole:
- Server Components di default; `"use client"` solo per mappa (scheda), form, lightbox, filtri.
- Mappa SVG inline renderizzata lato server; il JS della scheda si idrata solo all'interazione.
- Nessun iframe al caricamento (Google Calendar, video) → pattern "facade" su click.
- Immagini: `next/image`, AVIF/WebP, dimensioni esplicite, lazy sotto la piega.
- Font self-hosted, preload solo display, `swap`.
- Niente librerie UI pesanti, niente jQuery, niente slider/carousel JS.
- Script di terze parti (analytics) con `strategy="afterInteractive"` o `lazyOnload`.

## 9. SEO
- `metadata` per ogni pagina, `title` ≤ 60 caratteri, `description` ≤ 155.
- Open Graph + Twitter card con immagine generata (`opengraph-image.tsx`).
- `sitemap.xml` e `robots.txt` generati da Next.
- Dati strutturati: `Organization` (home), `Event` per ogni edizione con data (con `eventStatus`, `location`, `offers` se c'è `ticketUrl`), `FAQPage`, `BreadcrumbList` sulle pagine città.
- URL leggibili in italiano, `lang="it"`, canonical.
- Parole chiave naturali: "Startup Weekend {città}", "evento startup {città}", "come creare una startup in un weekend".

## 10. Accessibilità (WCAG 2.2 AA)
- Contrasti verificati con i token (§2.1).
- Navigazione completa da tastiera, focus visibile (anello `azzurro-forte` 2px).
- Link "Salta al contenuto".
- Form: label visibili, errori associati con `aria-describedby`, messaggi di errore in testo (non solo colore), annuncio dello step corrente.
- `prefers-reduced-motion` rispettato (countdown e animazioni disattivabili).
- Testi alternativi su tutte le immagini; loghi con `alt="{Testata}"`.

## 11. Privacy e GDPR
- Informativa privacy (testo legale fornito dal team; intanto placeholder `Lorem ipsum`) con titolare del trattamento: TODO.
- Email e telefono dei referenti **mai pubblici**, accessibili solo al team in Airtable.
- Consenso esplicito separato per la pubblicazione di nome e cognome.
- Analytics cookieless → nessun banner per l'analytics. Se si attiva l'embed Google Calendar, mostrare l'avviso "Caricando il calendario accetti i cookie di Google" sul bottone facade.
- Rimini Youth: il sito **non raccoglie dati di minori** (nessun form di iscrizione studenti).

## 12. Struttura del repository
```
/app
  layout.tsx  page.tsx
  citta/[slug]/page.tsx
  calendario/page.tsx  organizza/page.tsx  stampa/page.tsx
  startup/page.tsx  faq/page.tsx  contatti/page.tsx
  privacy/page.tsx  cookie/page.tsx
  api/referenti/route.ts  api/contatti/route.ts  api/revalidate/route.ts
  sitemap.ts  robots.ts  opengraph-image.tsx
/components
  Header  Footer  Hero  ItalyMap  CityPin  CitySheet  UpcomingTable
  CalendarFacade  HowItWorks  CityGrid  CityCard  OrganizeForm (3 step)
  ContactForm  StartupList  PhotoGallery  PressList  MediaPartners
  FaqAccordion  Newsletter  SocialLinks
/content
  cities.json  startups.json  photos.json  press.json
  media-partners.json  faq.json  social.json  site.json
/lib
  airtable.ts  mail.ts  turnstile.ts  ics.ts  geo.ts  dates.ts  schema.ts
/public
  brand/  foto/  italy.svg
```

## 13. Contenuti placeholder — riepilogo
Il team deve fornire (tutto marcato `TODO` nel codice):
- [ ] Link ai siti di ogni SW cittadino (tutti tranne Padova) + link biglietti
- [ ] Date confermate delle prossime edizioni (Padova da confermare)
- [ ] Cognome di Rossella (Parma); nome completo di Nox, se va mostrato
- [ ] Email reali di Nox e Marco + email generale del sito
- [ ] ID del Google Calendar pubblico
- [ ] Profili social nazionali e cittadini
- [ ] Rassegna stampa (articoli reali), media partner confermati, press kit
- [ ] Foto degli eventi con credit e liberatorie
- [ ] Elenco startup nate agli SW
- [ ] Numeri italiani (partecipanti, edizioni, startup) da mostrare
- [ ] Logo Startup Weekend in SVG, testo privacy, provider newsletter
- [ ] Credenziali Airtable, Resend, Turnstile

## 14. Piano di lavoro per fasi
1. **Setup**: Next.js + TS + Tailwind v4, token colori, font, layout, header/footer, `.env.example`.
2. **Dati**: `cities.json` con le 13 città del §5.2, altri file `/content` con placeholder, tipi TypeScript + validazione `zod` dei file in build.
3. **Home statica**: hero, come funziona, griglia città, FAQ, footer.
4. **Mappa + scheda città** (incluso caso Rimini) e **tabella prossimi SW**, generazione `.ics`.
5. **Calendario Google** (facade, link iscrizione/download) e pagina `/calendario`.
6. **Pagine città** dinamiche + SEO + dati strutturati.
7. **Form 3 step + Airtable + email + revalidate**, form contatti, newsletter.
8. **Stampa, media partner, startup, foto** (con placeholder).
9. **Rifinitura**: accessibilità, Lighthouse, test, pagine legali, sitemap.

## 15. Criteri di accettazione
- [ ] Lighthouse mobile ≥ 95 in Performance, Accessibilità, Best Practice e SEO su `/` e `/citta/padova`.
- [ ] La mappa mostra le 13 città; ogni pin è raggiungibile da tastiera e apre la scheda corretta.
- [ ] Città con data → scheda con data, luogo, CTA biglietto e "Aggiungi al calendario". Città senza data → "in preparazione" + CTA "Voglio partecipare".
- [ ] Rimini mostra il badge Youth, il testo del §5.4 e **nessuna** CTA d'iscrizione.
- [ ] Tabella prossimi SW e mappa leggono la stessa fonte dati e sono coerenti.
- [ ] I link calendario Google / iCal / .ics funzionano; l'iframe si carica solo su click.
- [ ] Ogni città ha il link al proprio sito o il testo "Lorem ipsum" se manca.
- [ ] Compilando il form 3 step: record in Airtable, email a Nox e Marco, e entro pochi secondi nome e cognome visibili nella città scelta. Email e telefono non sono presenti in nessuna risposta HTML/JSON pubblica.
- [ ] Togliendo "Visibile sul sito" in Airtable, il nome sparisce entro 5 minuti (o subito con il webhook).
- [ ] Form contatti salva in Airtable e invia email.
- [ ] La FAQ "quante persone servono con 80 partecipanti" è presente nella sezione organizzatori.
- [ ] Nessun dato inventato: rassegna stampa, media partner, startup, foto e social sono placeholder chiaramente marcati.
- [ ] Sito interamente in italiano, tono di voce come Padova, colori e font come da §2.
- [ ] Nessun link `#` visibile in produzione senza indicazione "in arrivo".
