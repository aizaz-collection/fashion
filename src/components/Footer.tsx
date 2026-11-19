"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { categories } from "@/lib/data";
import { Banknote, Facebook, Instagram, Mail, Phone, Truck, WhatsApp } from "@/components/icons";

const WHATSAPP_URL = "https://wa.me/923001234567";

export default function Footer() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    toast("Welcome to the inner circle ✦");
  };

  return (
    <footer className="border-t border-white/5 bg-charcoal/70">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="font-display text-3xl font-bold text-gold-gradient">AIZAZ</span>
              <span className="text-[10px] tracking-[0.42em] text-cream/60">COLLECTIONS</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Curated luxury fashion, accessories & fragrances — delivered to your
              doorstep across Pakistan with the trust of Cash on Delivery.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                { icon: WhatsApp, label: "WhatsApp", href: WHATSAPP_URL },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:border-gold/60 hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Shop</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/shop" className="text-cream/70 transition hover:text-gold">
                  All Products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className="text-cream/70 transition hover:text-gold">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/wishlist" className="text-cream/70 transition hover:text-gold">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company + newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Company</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-cream/70 transition hover:text-gold">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/70 transition hover:text-gold">Contact</Link>
              </li>
              <li>
                <Link href="/cart" className="text-cream/70 transition hover:text-gold">Your Cart</Link>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-cream/70 transition hover:text-gold">
                  Order on WhatsApp
                </a>
              </li>
            </ul>
            <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Newsletter</h4>
            <form onSubmit={subscribe} className="mt-4">
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gold-light"
                >
                  ✦ You&apos;re on the list. Early access awaits.
                </motion.p>
              ) : (
                <div className="flex overflow-hidden rounded-full border border-white/12 bg-white/[0.04] focus-within:border-gold/60">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent px-4 py-2.5 text-sm text-cream outline-none placeholder:text-cream/30"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-gold px-4 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-gold-light"
                  >
                    Join
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-cream/70">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" /> +92 300 1234567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" /> hello@aizazcollections.com
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-gold">✦</span> Gulberg III, Lahore, Pakistan
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 text-[11px] text-gold-light">
                <Banknote className="h-3.5 w-3.5" /> COD Available
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-cream/60">
                <Truck className="h-3.5 w-3.5" /> 2–4 Day Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Aizaz Collections. All rights reserved.</p>
          <p className="tracking-wider">LUXURY, DELIVERED. ✦ CASH ON DELIVERY</p>
        </div>
      </div>
    </footer>
  );
}