import Link from "next/link";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center md:py-28">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06] text-gold">
        {icon}
      </div>
      <h2 className="mt-7 font-display text-3xl text-cream">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light">
          {actionLabel}
        </Link>
      )}
      {actionLabel && !actionHref && onAction && (
        <button type="button" onClick={onAction} className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
