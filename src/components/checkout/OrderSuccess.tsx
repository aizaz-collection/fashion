"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Banknote, Check, Package, Truck, WhatsApp } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/site";

export default function OrderSuccess() {
  const { lastOrder, mounted } = useStore();

  if (!mounted) return <div className="mx-auto min-h-[60vh] max-w-3xl animate-pulse px-4 py-20"><div className="h-80 rounded-3xl bg-white/5" /></div>;

  if (!lastOrder) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-cream">No recent order found.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">Start a new order or return to the collection.</p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.17em] text-ink">Explore the collection <ArrowRight className="h-4 w-4" /></Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
      <div className="overflow-hidden rounded-[1.75rem] border border-gold/20 bg-charcoal/70 shadow-2xl shadow-black/30">
        <div className="relative border-b border-white/[0.07] px-6 py-12 text-center sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_58%)]" />
          <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg shadow-gold/20"><Check className="h-7 w-7" /></span>
          <p className="relative mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Order confirmed</p>
          <h1 className="relative mt-3 font-display text-4xl text-cream sm:text-5xl">Thank you, {lastOrder.customer.name.split(" ")[0]}.</h1>
          <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">Your order has been received. We will confirm it by phone shortly and dispatch it with care.</p>
          <p className="relative mt-6 inline-flex rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-gold">Order {lastOrder.id}</p>
        </div>

        <div className="p-6 sm:p-9">
          <div className="space-y-4">
            {lastOrder.items.map((item) => (
              <div key={`${item.productId}-${item.size ?? ""}`} className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-surface"><Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" /></div>
                <div className="min-w-0 flex-1"><p className="font-display text-lg text-cream">{item.name}</p><p className="mt-1 text-xs text-muted">Quantity: {item.qty}{[item.size, item.color].filter(Boolean).length > 0 && ` · ${[item.size, item.color].filter(Boolean).join(" · ")}`}</p></div>
                <p className="text-sm font-semibold text-gold">{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-3 border-t border-white/[0.07] pt-6 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span className="text-cream">{formatPrice(lastOrder.subtotal)}</span></div>
            <div className="flex justify-between text-muted"><span>Delivery</span><span className="text-cream">{lastOrder.shipping === 0 ? "Free" : formatPrice(lastOrder.shipping)}</span></div>
            <div className="flex justify-between border-t border-white/[0.07] pt-4"><span className="font-semibold text-cream">Total to pay on delivery</span><span className="text-xl font-semibold text-gold">{formatPrice(lastOrder.total)}</span></div>
          </div>

          <div className="mt-7 grid gap-3 rounded-2xl border border-gold/15 bg-gold/[0.035] p-5 sm:grid-cols-3">
            <p className="flex items-center gap-2 text-xs text-cream/80"><Banknote className="h-4 w-4 text-gold" /> Cash on delivery</p>
            <p className="flex items-center gap-2 text-xs text-cream/80"><Truck className="h-4 w-4 text-gold" /> 2–4 day delivery</p>
            <p className="flex items-center gap-2 text-xs text-cream/80"><Package className="h-4 w-4 text-gold" /> Quality checked</p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hello, I have a question about order ${lastOrder.id}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/35 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold/[0.07]"><WhatsApp className="h-4 w-4" /> Contact support</a>
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light">Continue shopping <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
