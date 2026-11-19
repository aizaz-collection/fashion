"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ArrowRight, Heart, ShoppingBag } from "@/components/icons";

export default function WishlistView() {
  const { wishlist, addToCart, mounted } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  if (!mounted) return <div className="mx-auto min-h-[55vh] max-w-7xl animate-pulse px-4 py-20 lg:px-8"><div className="h-80 rounded-2xl bg-white/5" /></div>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
      <div className="mb-10 border-b border-white/[0.07] pb-7"><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Your private edit</p><h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">Wishlist</h1></div>
      {saved.length === 0 ? (
        <div className="flex min-h-[45vh] flex-col items-center justify-center text-center"><span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.06] text-gold"><Heart className="h-8 w-8" /></span><h2 className="mt-7 font-display text-3xl text-cream">Save what speaks to you.</h2><p className="mt-3 text-sm text-muted">Tap the heart on any piece to keep it close.</p><Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.17em] text-ink">Explore the collection <ArrowRight className="h-4 w-4" /></Link></div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {saved.map((product) => <article key={product.id} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-charcoal"><Link href={`/product/${product.slug}`} className="relative block aspect-[4/5]"><Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-105" /></Link><div className="p-4"><Link href={`/product/${product.slug}`} className="font-display text-lg text-cream transition hover:text-gold">{product.name}</Link><p className="mt-2 text-sm font-semibold text-gold">{formatPrice(product.price)}</p><button type="button" onClick={() => addToCart(product)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink"><ShoppingBag className="h-3.5 w-3.5" /> Add to cart</button></div></article>)}
        </div>
      )}
    </section>
  );
}
