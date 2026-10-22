import { SocialIcon } from "./Icons";

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
};

/** Mostra solo i profili con un link reale; se non ce n'è nessuno lo dice, invece di mostrare link morti. */
export function SocialLinks({ links, className = "" }: { links: Record<string, string | null | undefined>; className?: string }) {
  const active = Object.entries(links).filter((e): e is [string, string] => Boolean(e[1]));
  if (active.length === 0) return <p className={`text-sm ${className}`}>Profili social in arrivo.</p>;
  return (
    <ul className={`flex gap-2 ${className}`}>
      {active.map(([name, href]) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener" className="grid size-10 place-items-center rounded-full border border-current/30 hover:bg-current/10">
            <SocialIcon name={name} />
            <span className="sr-only">{LABELS[name] ?? name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
