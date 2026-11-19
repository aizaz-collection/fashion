import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
        <span className="h-px w-8 bg-gold/60" />
        {eyebrow}
        <span className="h-px w-8 bg-gold/60" />
      </span>
      <h2 className="font-display text-3xl leading-tight text-cream md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{description}</p>
      ) : null}
    </Reveal>
  );
}