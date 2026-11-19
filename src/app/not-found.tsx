import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_50%)]" />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">Error 404</p>
        <h1 className="mt-5 font-display text-6xl text-cream md:text-8xl">Lost in luxury.</h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted">The page you are looking for has moved or no longer exists. Let us guide you back to the collection.</p>
        <Link href="/" className="mt-9 inline-flex rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light">Return home</Link>
      </div>
    </section>
  );
}
