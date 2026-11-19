"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Banknote, Check, ShieldCheck, ShoppingBag, Truck } from "@/components/icons";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/format";
import type { CustomerInfo } from "@/lib/types";

const initialCustomer: CustomerInfo = { name: "", phone: "", address: "", city: "", notes: "" };

export default function CheckoutForm() {
  const { cart, cartTotal, placeOrder, mounted } = useStore();
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerInfo>(initialCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;

  const update = (field: keyof CustomerInfo, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof CustomerInfo, string>> = {};
    if (customer.name.trim().length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[+\d][\d\s-]{9,}$/.test(customer.phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    if (customer.address.trim().length < 8) nextErrors.address = "Enter your complete delivery address.";
    if (customer.city.trim().length < 2) nextErrors.city = "Enter your city.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitting(true);
    placeOrder(customer);
    router.push("/order-success");
  };

  if (!mounted) return <div className="mx-auto min-h-[60vh] max-w-7xl animate-pulse px-4 py-20 lg:px-8"><div className="h-80 rounded-2xl bg-white/5" /></div>;

  if (cart.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.06] text-gold"><ShoppingBag className="h-8 w-8" /></span>
        <h1 className="mt-7 font-display text-4xl text-cream">Nothing to check out yet.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">Add a piece to your cart first, then complete your Cash on Delivery order here.</p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.17em] text-ink transition hover:bg-gold-light">Go to shop <ArrowRight className="h-4 w-4" /></Link>
      </section>
    );
  }

  const fieldClass = "w-full rounded-xl border border-white/[0.09] bg-ink/60 px-4 py-3.5 text-sm text-cream outline-none transition placeholder:text-muted/45 focus:border-gold/55 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.06)]";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
      <div className="mb-10 border-b border-white/[0.07] pb-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Secure checkout</p>
        <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">Complete your order</h1>
      </div>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_23rem] lg:gap-12">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-white/[0.08] bg-charcoal/60 p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">1</span><h2 className="font-display text-2xl text-cream">Delivery details</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-medium text-cream/80">Full name<input required value={customer.name} onChange={(event) => update("name", event.target.value)} placeholder="Your full name" className={`mt-2 ${fieldClass}`} />{errors.name && <span className="mt-1 block text-[10px] text-rose-400">{errors.name}</span>}</label>
              <label className="text-xs font-medium text-cream/80">Phone number<input required type="tel" value={customer.phone} onChange={(event) => update("phone", event.target.value)} placeholder="03XX XXXXXXX" className={`mt-2 ${fieldClass}`} />{errors.phone && <span className="mt-1 block text-[10px] text-rose-400">{errors.phone}</span>}</label>
              <label className="text-xs font-medium text-cream/80 sm:col-span-2">Delivery address<input required value={customer.address} onChange={(event) => update("address", event.target.value)} placeholder="House number, street, area" className={`mt-2 ${fieldClass}`} />{errors.address && <span className="mt-1 block text-[10px] text-rose-400">{errors.address}</span>}</label>
              <label className="text-xs font-medium text-cream/80">City<input required value={customer.city} onChange={(event) => update("city", event.target.value)} placeholder="Your city" className={`mt-2 ${fieldClass}`} />{errors.city && <span className="mt-1 block text-[10px] text-rose-400">{errors.city}</span>}</label>
              <label className="text-xs font-medium text-cream/80">Order notes <span className="text-muted/50">(optional)</span><input value={customer.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Delivery notes" className={`mt-2 ${fieldClass}`} /></label>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-gold/20 bg-gold/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">2</span><h2 className="font-display text-2xl text-cream">Payment method</h2></div>
            <div className="flex items-start gap-4 rounded-xl border border-gold/35 bg-gold/[0.07] p-4">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink"><Check className="h-3 w-3" /></span>
              <div><p className="text-sm font-semibold text-cream">Cash on Delivery</p><p className="mt-1 text-xs leading-5 text-muted">Pay the courier in cash when your parcel arrives. No advance payment, no card details.</p></div>
            </div>
          </div>
          <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light disabled:opacity-60">{submitting ? "Placing order…" : "Place COD order"}<ArrowRight className="h-4 w-4" /></button>
        </div>

        <aside className="h-fit rounded-[1.5rem] border border-white/[0.08] bg-charcoal/70 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-cream">Your order</h2>
          <div className="mt-6 max-h-64 space-y-4 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.key} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-surface"><Image src={item.product.images[0]} alt={item.product.name} fill sizes="56px" className="object-cover" /><span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[8px] font-bold text-ink">{item.qty}</span></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-cream">{item.product.name}</p><p className="mt-1 text-xs text-muted">{[item.size, item.color].filter(Boolean).join(" · ")}</p></div>
                <p className="text-xs font-semibold text-gold">{formatPrice(item.product.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-white/[0.07] pt-5 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span className="text-cream">{formatPrice(cartTotal)}</span></div>
            <div className="flex justify-between text-muted"><span>Delivery</span><span className={shipping === 0 ? "text-emerald-400" : "text-cream"}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between border-t border-white/[0.07] pt-4"><span className="font-semibold text-cream">Total</span><span className="text-xl font-semibold text-gold">{formatPrice(total)}</span></div>
          </div>
          <div className="mt-6 space-y-3 rounded-xl border border-white/[0.07] bg-ink/40 p-4 text-[11px] text-muted">
            <p className="flex items-center gap-2"><Banknote className="h-3.5 w-3.5 text-gold" /> Pay only when your parcel arrives</p>
            <p className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-gold" /> Delivery in 2–4 working days</p>
            <p className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> Order confirmation by phone</p>
          </div>
        </aside>
      </form>
    </section>
  );
}
