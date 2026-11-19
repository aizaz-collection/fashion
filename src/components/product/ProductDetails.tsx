"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import Accordion from "@/components/ui/Accordion";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { Banknote, Check, Heart, HeartFilled, ShieldCheck, ShoppingBag, Star, Truck } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart, buyNow, toggleWishlist, isWishlisted, addRecentlyViewed } = useStore();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const wished = isWishlisted(product.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [addRecentlyViewed, product.id]);

  const goToCheckout = () => {
    buyNow(product, quantity, selectedSize, selectedColor);
    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-gold">Home</Link>
        <span className="text-gold/40">/</span>
        <Link href="/shop" className="transition hover:text-gold">Shop</Link>
        <span className="text-gold/40">/</span>
        <Link href={`/shop?category=${product.category}`} className="capitalize transition hover:text-gold">{product.category}</Link>
        <span className="text-gold/40">/</span>
        <span className="text-cream/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="grid gap-4 sm:grid-cols-[5rem_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
            {product.images.map((image, index) => (
              <button key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}`} aria-pressed={activeImage === index} className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border transition ${activeImage === index ? "border-gold" : "border-white/10 opacity-65 hover:opacity-100"}`}>
                <Image src={image} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-charcoal sm:order-2">
            <Image src={product.images[activeImage] ?? product.images[0]} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
            {product.badge && <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-ink">{product.badge}</span>}
          </div>
        </div>

        <div className="lg:py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">{product.name}</h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex items-center gap-1 text-gold"><Star className="h-4 w-4" /><span className="text-sm font-semibold">{product.rating.toFixed(1)}</span></span>
            <span className="text-xs text-muted">{product.reviews} reviews</span>
            <span className={`ml-auto rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] ${product.inStock ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"}`}>{product.inStock ? "In stock" : "Sold out"}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold text-gold">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-base text-muted line-through">{formatPrice(product.oldPrice)}</span>}
            {discount > 0 && <span className="text-xs font-bold uppercase tracking-wider text-gold-light">Save {discount}%</span>}
          </div>

          <p className="mt-7 text-sm leading-7 text-muted">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream">Size</p><span className="text-xs text-gold">{selectedSize}</span></div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`h-11 min-w-11 rounded-xl border px-3 text-xs font-semibold transition ${selectedSize === size ? "border-gold bg-gold text-ink" : "border-white/10 text-cream/70 hover:border-gold/50"}`}>{size}</button>)}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream">Colour</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => <button key={color.name} type="button" onClick={() => setSelectedColor(color.name)} aria-pressed={selectedColor === color.name} className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition ${selectedColor === color.name ? "border-gold/60 bg-gold/[0.08] text-cream" : "border-white/10 text-muted"}`}><span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />{color.name}</button>)}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream">Quantity</span>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button type="button" disabled={!product.inStock} onClick={() => addToCart(product, quantity, selectedSize, selectedColor)} className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light disabled:opacity-40"><ShoppingBag className="h-4 w-4" /> Add to cart</button>
            <button type="button" disabled={!product.inStock} onClick={goToCheckout} className="inline-flex items-center justify-center rounded-full border border-gold/40 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold/[0.07] disabled:opacity-40">Buy now · COD</button>
          </div>

          <button type="button" onClick={() => toggleWishlist(product)} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream/70 transition hover:text-gold">{wished ? <HeartFilled className="h-4 w-4 text-gold" /> : <Heart className="h-4 w-4" />}{wished ? "Saved to wishlist" : "Add to wishlist"}</button>

          <div className="mt-8 grid gap-3 rounded-2xl border border-gold/15 bg-gold/[0.035] p-5 sm:grid-cols-3">
            <div className="flex items-center gap-2.5"><Banknote className="h-4 w-4 text-gold" /><span className="text-[11px] text-cream/80">Cash on delivery</span></div>
            <div className="flex items-center gap-2.5"><Truck className="h-4 w-4 text-gold" /><span className="text-[11px] text-cream/80">2–4 day delivery</span></div>
            <div className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-gold" /><span className="text-[11px] text-cream/80">7-day exchange</span></div>
          </div>

          <div className="mt-10">
            <Accordion items={[
              { title: "Details & materials", content: <ul className="space-y-2">{product.details.map((detail) => <li key={detail} className="flex gap-2"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />{detail}</li>)}</ul> },
              { title: "Cash on Delivery", content: "Place your order without advance payment. We confirm by phone, dispatch within 2–4 working days, and you inspect the parcel before paying the courier in cash." },
              { title: "Delivery & exchanges", content: "We deliver nationwide. If your size is not right, contact us within 7 days of delivery and our team will arrange an exchange or refund for quality issues." },
            ]} />
          </div>
        </div>
      </div>
    </section>
  );
}
