import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="Errore 404" title="Questa pagina non esiste (ancora)." lead="Magari è un'idea da pitchare al prossimo Startup Weekend.">
      <Link href="/" className="btn-primary mt-8">
        Torna alla home
      </Link>
    </PageHero>
  );
}
