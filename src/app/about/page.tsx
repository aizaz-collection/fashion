import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Banknote, Package, ShieldCheck, Sparkles, Truck } from "@/components/icons";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Aizaz Collections: a curated destination for refined fashion, accessories and fragrances, delivered across Pakistan with Cash on Delivery.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,0.14),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold">Our story</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.04] text-cream md:text-7xl">
              Chosen with intention. <span className="italic text-gold-gradient">Worn with pride.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted">
              Aizaz Collections began with a simple belief: everyday luxury should feel personal, refined and trustworthy. We curate fashion, accessories and fragrances that bring lasting character to every occasion.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light">
                Explore the collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold/60 hover:text-gold">
                Contact us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-gold/10" />
            <div className="relative grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((product, index) => (
                <div key={product.id} className={`relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-charcoal ${index % 2 === 1 ? "mt-8" : ""}`}>
                  <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 1024px) 45vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">What guides us</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-cream md:text-5xl">Luxury in every considered detail.</h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-muted">
            <p>We look beyond labels to the qualities that make a piece worth keeping: thoughtful materials, refined finishing, distinctive design and reliable craftsmanship. Every item in our edit is selected to work beautifully, whether it becomes a personal signature or a future favourite.</p>
            <p>Our service follows the same standard. From finding the right size to receiving your parcel, we keep the experience clear, personal and dependable. Nationwide Cash on Delivery lets you see your order before you pay.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, title: "Curated quality", text: "A focused edit chosen for lasting style and character." },
            { icon: Package, title: "Thoughtful delivery", text: "Carefully packed and dispatched across Pakistan." },
            { icon: Banknote, title: "Cash on Delivery", text: "Inspect your order, then pay safely at the door." },
            { icon: ShieldCheck, title: "Customer first", text: "Responsive guidance before and after your order." },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-white/[0.08] bg-charcoal/55 p-6">
              <Icon className="h-5 w-5 text-gold" />
              <h3 className="mt-5 font-display text-xl text-cream">{title}</h3>
              <p className="mt-3 text-xs leading-6 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-charcoal/35 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">Ready when you are</p>
            <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">Find your next signature piece.</h2>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted"><Truck className="h-4 w-4 text-gold" /> Nationwide delivery in 2–4 working days.</p>
          </div>
          <Link href="/shop" className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light">
            Shop the collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
