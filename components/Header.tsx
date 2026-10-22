import Link from "next/link";
import { ArrowRight, Menu } from "./Icons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export const NAV = [
  { href: "/#citta", label: "Città" },
  { href: "/calendario", label: "Calendario" },
  { href: "/organizza", label: "Organizza" },
  { href: "/startup", label: "Startup" },
  { href: "/stampa", label: "Stampa" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-filo bg-pagina">
      <div className="container-sw flex h-16 items-center justify-between gap-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav aria-label="Principale" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-semibold">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-azzurro-forte">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/#mappa" className="btn-primary hidden !px-5 !py-2 text-sm lg:inline-flex">
          Trova il tuo SW <ArrowRight />
        </Link>
        <MobileMenu>
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full hover:bg-superficie-alt [&::-webkit-details-marker]:hidden">
            <Menu />
            <span className="sr-only">Apri il menu</span>
          </summary>
          <nav aria-label="Principale mobile" className="absolute right-0 mt-2 w-64 rounded-2xl border border-filo bg-pagina p-3 shadow-xl">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-lg px-3 py-3 font-semibold hover:bg-superficie">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link href="/#mappa" className="btn-primary w-full">
                  Trova il tuo SW <ArrowRight />
                </Link>
              </li>
            </ul>
          </nav>
        </MobileMenu>
      </div>
    </header>
  );
}
