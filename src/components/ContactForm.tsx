"use client";

import { useState } from "react";
import { Send, ShieldCheck } from "@/components/icons";
import { SITE_CONFIG } from "@/lib/site";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  order: string;
  message: string;
};

const initialValues: FormValues = { name: "", email: "", phone: "", order: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "New enquiry — Aizaz Collections",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      values.order ? `Order number: ${values.order}` : "",
      `Message: ${values.message}`,
    ].filter(Boolean).join("\n");
    window.open(`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const fieldClass = "w-full rounded-xl border border-white/[0.09] bg-ink/60 px-4 py-3.5 text-sm text-cream outline-none transition placeholder:text-muted/45 focus:border-gold/55 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.06)]";

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-white/[0.08] bg-charcoal/70 p-6 shadow-2xl shadow-black/25 sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Send a message</p>
        <h2 className="mt-3 font-display text-3xl text-cream">How can we help?</h2>
        <p className="mt-3 text-sm leading-6 text-muted">Share the details below and continue securely in WhatsApp. Our team usually replies within a few hours.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-cream/80">
          Full name
          <input required value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" className={`mt-2 ${fieldClass}`} />
        </label>
        <label className="text-xs font-medium text-cream/80">
          Phone number
          <input required type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} placeholder="03XX XXXXXXX" className={`mt-2 ${fieldClass}`} />
        </label>
        <label className="text-xs font-medium text-cream/80">
          Email address
          <input required type="email" value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className={`mt-2 ${fieldClass}`} />
        </label>
        <label className="text-xs font-medium text-cream/80">
          Order number <span className="text-muted/60">(optional)</span>
          <input value={values.order} onChange={(event) => update("order", event.target.value)} placeholder="AC-XXXXXX" className={`mt-2 ${fieldClass}`} />
        </label>
      </div>

      <label className="mt-4 block text-xs font-medium text-cream/80">
        Message
        <textarea required rows={5} value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us about the product, order or guidance you need…" className={`mt-2 resize-none ${fieldClass}`} />
      </label>

      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-light active:scale-[0.99]">
        <Send className="h-4 w-4" /> Send via WhatsApp
      </button>
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-[10px] leading-5 text-muted/70">
        <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Your message opens in WhatsApp for your review before sending.
      </p>
    </form>
  );
}
