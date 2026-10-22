import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    day: "Venerdì",
    title: "Pitch",
    text: "Presenti la tua idea in 60 secondi. Si votano le migliori e si formano i team. Non hai un'idea? Unisciti a una che ti convince.",
  },
  {
    day: "Sabato",
    title: "Build",
    text: "Lavori con il team, parli con clienti veri per validare l'idea e costruisci il prototipo. I mentor passano dai tavoli per aiutarti.",
  },
  {
    day: "Domenica",
    title: "Demo",
    text: "Presenti il progetto a una giuria di esperti. Si premiano i team migliori, ma tutti tornano a casa con molto più di quanto pensavano.",
  },
];

const GAINS = [
  "Un team con cui lavorare davvero, non solo un contatto su LinkedIn",
  "Competenze pratiche: validazione, prototipazione, pitch",
  "Feedback diretto da mentor e founder esperti",
  "Un'esperienza da raccontare (e da mettere nel curriculum)",
];

export function HowItWorks() {
  return (
    <section aria-labelledby="come-funziona" className="section on-dark bg-blu text-white">
      <div className="container-sw">
        <SectionHeading
          id="come-funziona"
          eyebrow="Come funziona"
          title="Non è un corso. È un weekend che ti cambia il curriculum."
          lead="Da venerdì sera a domenica sera: 54 ore per passare da un'idea a una startup con un prototipo e un pitch."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="font-display text-5xl font-bold text-azzurro">{i + 1}</p>
              <p className="mt-4 text-sm font-semibold text-bianco-2 uppercase">{s.day}</p>
              <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-bianco-2">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <h3 className="text-xl font-bold">Cosa ti porti a casa</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {GAINS.map((g) => (
              <li key={g} className="flex gap-3 text-bianco-2">
                <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-fuxia" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
