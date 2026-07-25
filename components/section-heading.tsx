import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Badge className="mb-4 bg-white/80">{eyebrow}</Badge> : null}
      <h2 className="font-serif text-4xl leading-tight text-[#111111] md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[#6B7280]">{description}</p> : null}
    </div>
  );
}
