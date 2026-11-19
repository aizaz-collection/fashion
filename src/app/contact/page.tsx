import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Banknote, Clock, Mail, MapPin, Phone, Truck, WhatsApp } from "@/components/icons";
import { SITE_CONFIG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Aizaz Collections for product guidance, order support and nationwide Cash on Delivery assistance.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold">We are here to help</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-cream md:text-7xl">Let&apos;s <span className="italic text-gold-gradient">talk.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base">Questions about a piece, an existing order or Cash on Delivery? Reach our team directly and we will guide you personally.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <aside>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Contact details</p>
            <h2 className="mt-3 font-display text-4xl text-cream">We&apos;re a message away.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">For the fastest response, WhatsApp is ideal. You can also call or email us during our business hours.</p>

            <div className="mt-8 space-y-3">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-charcoal/55 p-4 transition hover:border-gold/35">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/[0.08] text-gold"><Phone className="h-4 w-4" /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Call us</span><span className="mt-1 block text-sm font-semibold text-cream group-hover:text-gold">{SITE_CONFIG.phone}</span></span>
              </a>
              <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-charcoal/55 p-4 transition hover:border-gold/35">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/[0.08] text-gold"><WhatsApp className="h-4 w-4" /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">WhatsApp</span><span className="mt-1 block text-sm font-semibold text-cream group-hover:text-gold">Start a conversation</span></span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-charcoal/55 p-4 transition hover:border-gold/35">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/[0.08] text-gold"><Mail className="h-4 w-4" /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Email</span><span className="mt-1 block text-sm font-semibold text-cream group-hover:text-gold">{SITE_CONFIG.email}</span></span>
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-gold/15 bg-gold/[0.045] p-5">
              <div className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><div><p className="text-xs font-semibold text-cream">Business hours</p><p className="mt-1 text-xs leading-5 text-muted">Monday–Saturday, 10:00 AM–8:00 PM</p></div></div>
              <div className="mt-4 flex items-start gap-3 border-t border-gold/10 pt-4"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><div><p className="text-xs font-semibold text-cream">Studio</p><p className="mt-1 text-xs leading-5 text-muted">{SITE_CONFIG.address}</p></div></div>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-charcoal/35 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-3"><Banknote className="h-5 w-5 text-gold" /><div><p className="text-xs font-semibold text-cream">Cash on Delivery</p><p className="mt-1 text-[11px] text-muted">Pay when your order arrives</p></div></div>
          <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-gold" /><div><p className="text-xs font-semibold text-cream">2–4 Working Days</p><p className="mt-1 text-[11px] text-muted">Delivery across Pakistan</p></div></div>
          <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-gold" /><div><p className="text-xs font-semibold text-cream">Prompt Support</p><p className="mt-1 text-[11px] text-muted">Replies within a few hours</p></div></div>
        </div>
      </section>
    </>
  );
}
