export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <Tag id={id} className={Tag === "h1" ? "mt-2 text-4xl font-bold sm:text-5xl" : "h2"}>
        {title}
      </Tag>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
