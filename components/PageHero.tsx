export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="on-dark bg-blu text-white">
      <div className="container-sw py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-4xl leading-tight font-bold sm:text-5xl">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
