import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
  compact?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb = [],
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden border-b border-white/[0.06] ${compact ? "py-16 md:py-20" : "py-20 md:py-28"}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12),transparent_58%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full border border-gold/10" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full border border-gold/[0.07]" />
      <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
            {breadcrumb.map((item, index) => (
              <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 && <span className="text-gold/40">/</span>}
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-gold">{item.label}</Link>
                ) : (
                  <span className="text-cream/70">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl">{title}</h1>
          {description && <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted md:text-base">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
