"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowRight,
  Banknote,
  BadgeCheck,
  Package,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  StarOutline,
  Truck,
} from "@/components/icons";
import { categories, products, testimonials } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const featuredProducts = products
  .filter((product): product is Product => Boolean(product.featured))
  .slice(0, 8);
const heroProduct = products[0];
const storyProduct =
  products.find((product) => product.slug === "oud-royale-eau-de-parfum") ?? products[0];
const averageRating = (
  products.reduce((total, product) => total + product.rating, 0) / products.length
).toFixed(1);

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 110],
  );
  const heroCopyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 60],
  );

  return (
    <>
      <section
        ref={heroRef}
        aria-labelledby="home-hero-title"
        className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden border-b border-white/[0.06]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(212,175,55,0.18),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_85%,rgba(212,175,55,0.08),transparent_28%)]" />
        <div className="pointer-events-none absolute left-[8%] top-[18%] h-72 w-72 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute left-[11%] top-[23%] h-52 w-52 rounded-full border border-gold/[0.07]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <motion.div style={{ y: heroCopyY }} className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light">
                The new luxury edit · 2026
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-gold"
            >
              Aizaz Collections
            </motion.p>
            <motion.h1
              id="home-hero-title"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.27, ease: EASE }}
              className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.045em] text-cream"
            >
              Curated
              <span className="block italic text-gold-gradient">luxury.</span>
              <span className="block">Enduring style.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: EASE }}
              className="mt-8 max-w-xl text-base leading-8 text-muted md:text-lg"
            >
              Discover refined fashion, statement accessories and memorable fragrances—selected for those who expect more. Pay only when your order arrives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.48, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Explore the collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold/60 hover:text-gold"
              >
                View categories
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.65 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.08] pt-6 text-xs text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-gold" />
                {averageRating}/5 customer rating
              </span>
              <span className="inline-flex items-center gap-2">
                <Banknote className="h-4 w-4 text-gold" />
                Cash on delivery
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-gold" />
                Nationwide delivery
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: heroImageY }}
            initial={{ opacity: 0, scale: 0.96, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[2rem] border border-gold/15 sm:-inset-6" />
            <div className="absolute -right-7 -top-7 h-28 w-28 rounded-full border border-gold/30 sm:h-36 sm:w-36" />
            <Link
              href={`/product/${heroProduct.slug}`}
              aria-label={`View ${heroProduct.name}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-gold/20 bg-charcoal shadow-2xl shadow-black/60"
            >
              <Image
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-gold/30 bg-ink/75 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-gold-light backdrop-blur">
                Signature piece
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    Editor&apos;s choice
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
                    {heroProduct.name}
                  </h2>
                  <p className="mt-1 text-sm text-gold-light">
                    From {formatPrice(heroProduct.price)}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        aria-label="Shopping benefits"
        className="relative z-10 border-b border-white/[0.06] bg-charcoal/55"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: Banknote,
              title: "Cash on delivery",
              text: "Pay when your order arrives",
            },
            {
              icon: Truck,
              title: "Nationwide delivery",
              text: "Across Pakistan in 2–4 days",
            },
            {
              icon: ShieldCheck,
              title: "Quality assured",
              text: "Premium pieces, checked with care",
            },
            {
              icon: Package,
              title: "Luxury packaging",
              text: "Every order arrives presentation-ready",
            },
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="flex items-center gap-3 border-b border-white/[0.06] px-3 py-6 last:border-b-0 even:border-l sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.07] text-gold">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream">
                    {benefit.title}
                  </h2>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">
                    {benefit.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="categories" aria-labelledby="categories-title" className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
                Explore the edit
              </span>
              <h2
                id="categories-title"
                className="mt-4 font-display text-4xl leading-tight text-cream md:text-6xl"
              >
                A world of <span className="italic text-gold-gradient">distinction.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted md:text-right">
              From boardroom tailoring to signature scents, discover four considered collections designed to elevate every occasion.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-charcoal transition-colors duration-500 hover:border-gold/45"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={`${category.name} collection`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-ink/60 text-xs font-semibold text-gold backdrop-blur">
                      0{index + 1}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">
                        Collection
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-cream">{category.name}</h3>
                          <p className="mt-1 text-xs text-cream/60">{category.tagline}</p>
                        </div>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-gold">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="featured"
        aria-labelledby="featured-title"
        className="border-y border-white/[0.06] bg-charcoal/35 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
                Curated for you
              </span>
              <h2
                id="featured-title"
                className="mt-4 font-display text-4xl leading-tight text-cream md:text-6xl"
              >
                The <span className="italic text-gold-gradient">featured edit.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                Our most coveted pieces, chosen for exceptional materials, timeless design and effortless presence.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex shrink-0 items-center gap-3 self-start text-xs font-bold uppercase tracking-[0.2em] text-gold md:self-auto"
            >
              View all pieces
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 transition-colors group-hover:bg-gold group-hover:text-ink">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-gold/10" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/[0.08] bg-charcoal">
              <Image
                src={storyProduct.images[0]}
                alt={storyProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold">
                    The house signature
                  </p>
                  <p className="mt-2 font-display text-2xl text-cream">{storyProduct.name}</p>
                </div>
                <span className="rounded-full border border-gold/30 bg-ink/60 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-gold-light backdrop-blur">
                  12-hour wear
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
              Our philosophy
            </span>
            <h2
              id="story-title"
              className="mt-4 font-display text-4xl leading-[1.08] text-cream md:text-6xl"
            >
              Luxury is felt in the <span className="italic text-gold-gradient">details.</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-muted">
              We believe true luxury lives in what you rarely see: the hand-finished seam, the weight of the fabric, the subtle fragrance that lingers. Every piece is selected to make ordinary moments feel exceptional.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <div className="border-l border-gold/50 pl-5">
                <p className="font-display text-3xl text-cream">14</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">Curated pieces</p>
              </div>
              <div className="border-l border-gold/50 pl-5">
                <p className="font-display text-3xl text-cream">{averageRating}/5</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">Average rating</p>
              </div>
            </div>
            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold"
            >
              Discover our story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="testimonials-title"
        className="border-y border-white/[0.06] bg-charcoal/35 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
              Our clients
            </span>
            <h2
              id="testimonials-title"
              className="mt-4 font-display text-4xl leading-tight text-cream md:text-5xl"
            >
              Chosen with care. <span className="italic text-gold-gradient">Loved worldwide.</span>
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                className="relative flex min-h-64 flex-col rounded-2xl border border-white/[0.08] bg-ink/60 p-7 transition-colors hover:border-gold/35"
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/10" />
                <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, starIndex) =>
                    starIndex < Math.round(testimonial.rating) ? (
                      <Star key={starIndex} className="h-3.5 w-3.5 text-gold" />
                    ) : (
                      <StarOutline key={starIndex} className="h-3.5 w-3.5 text-gold/30" />
                    ),
                  )}
                </div>
                <blockquote className="relative mt-6 flex-1 font-display text-lg leading-8 text-cream/90">
                  “{testimonial.text}”
                </blockquote>
                <div className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.07] text-xs font-semibold text-gold">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(212,175,55,0.18),transparent_42%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.08]" />
        <Reveal className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
            Your signature awaits
          </span>
          <h2
            id="cta-title"
            className="mt-5 font-display text-4xl leading-[1.05] text-cream md:text-7xl"
          >
            Dress the moment. <span className="italic text-gold-gradient">Own the story.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
            Explore the collection and discover pieces made to turn every entrance into an occasion.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold/60 hover:text-gold"
            >
              Need guidance?
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

