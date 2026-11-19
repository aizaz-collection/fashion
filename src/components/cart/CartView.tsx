"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { ArrowRight, Banknote, ShoppingBag, Trash2, Truck } from "@/components/icons";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/format";

export default function CartView() {
  const { cart, cartCount, cartTotal, updateQty, removeFromCart, mounted } = useStore();
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  if (!mounted) {
    return <div className="mx-auto min-h-[55vh] max-w-7xl animate-pulse px-4 py-20 lg:px-8"><div className="h-12 w-64 rounded bg-white/5" /><div className="mt-10 h-64 rounded-2xl bg-white/5" /></div>;
  }

  if (cart.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.06] text-gold"><ShoppingBag className="h-8 w-8" /></span>
        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Your selection</p>
        <h1 className="mt-3 font-display text-4xl text-cream">Your cart is waiting.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">Explore the collection and choose a piece you will love. Every order is available with Cash on Delivery.</p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.17em] text-ink transition hover:bg-gold-light">Explore the collection <ArrowRight className="h-4 w-4" /></Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
      <div className="mb-10 flex items-end justify-between border-b border-white/[0.07] pb-7">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Your selection</p><h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">Shopping cart</h1></div>
        <p className="text-sm text-muted">{cartCount} {cartCount === 1 ? "piece" : "pieces"}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
        <div className="space-y-4">
          {remaining > 0 ? (
            <div className="rounded-2xl border border-gold/15 bg-gold/[0.04] p-4">
              <div className="flex justify-between text-xs"><span className="text-cream/80">Add {formatPrice(remaining)} more for free delivery</span><Truck className="h-4 w-4 text-gold" /></div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full rounded-full bg-gold transition-all" style={{ width: `${Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} /></div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm text-emerald-400"><Banknote className="h-4 w-4" /> You have unlocked free nationwide delivery.</div>
          )}

          {cart.map((item) => (
            <article key={item.key} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-charcoal/55 p-4 sm:p-5">
              <Link href={`/product/${item.product.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-surface sm:h-40 sm:w-32">
                <Image src={item.product.images[0]} alt={item.product.name} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">{item.product.category}</p><Link href={`/product/${item.product.slug}`} className="mt-1 block font-display text-lg text-cream transition hover:text-gold sm:text-xl">{item.product.name}</Link></div>
                  <button type="button" onClick={() => removeFromCart(item.key)} aria-label={`Remove ${item.product.name}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-rose-400/40 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                </div>
                {(item.size || item.color) && <p className="mt-2 text-xs text-muted">{item.size && `Size: ${item.size}`}{item.size && item.color && " · "}{item.color && `Colour: ${item.color}`}</p>}
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                  <QuantityStepper value={item.qty} onChange={(quantity) => updateQty(item.key, quantity)} />
                  <p className="text-lg font-semibold text-gold">{formatPrice(item.product.price * item.qty)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-[1.5rem] border border-white/[0.08] bg-charcoal/70 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-cream">Order summary</h2>
          <div className="mt-6 space-y-3 border-b border-white/[0.07] pb-5 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span className="text-cream">{formatPrice(cartTotal)}</span></div>
            <div className="flex justify-between text-muted"><span>Delivery</span><span className={shipping === 0 ? "text-emerald-400" : "text-cream"}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between text-muted"><span>Payment</span><span className="text-cream">Cash on Delivery</span></div>
          </div>
          <div className="flex items-baseline justify-between py-5"><span className="text-sm font-semibold text-cream">Total</span><span className="text-2xl font-semibold text-gold">{formatPrice(total)}</span></div>
          <Link href="/checkout" className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.17em] text-ink transition hover:bg-gold-light">Proceed to checkout <ArrowRight className="h-4 w-4" /></Link>
          <p className="mt-4 text-center text-[10px] leading-5 text-muted/70">No advance payment required. Pay in cash when your order arrives.</p>
        </aside>
      </div>
    </section>
  );
}
