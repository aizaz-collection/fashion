"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getBotReply, type BotReply } from "@/lib/ai";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { BadgeCheck, MessageCircle, Send, ShoppingBag, Sparkles, X } from "@/components/icons";

type ChatMessage = {
  id: number;
  role: "user" | "bot";
  text: string;
  products?: Product[];
  suggestions?: string[];
};

const GREETING: ChatMessage = {
  id: 0,
  role: "bot",
  text: "Welcome to Aizaz Collections. I'm Aiza, your shopping assistant. I can help you find a piece, confirm current prices and availability, or explain our Cash on Delivery process.",
  suggestions: ["What is available?", "Show best sellers", "How does COD work?", "Delivery time"],
};

const QUICK_CHIPS = ["Product prices", "Stock availability", "Cash on Delivery", "Delivery time"];

export default function AIChat() {
  const { addToCart } = useStore();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  // Auto-scroll to latest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    setUnread(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => window.clearTimeout(timer);
  }, [open]);

  const toggleChat = () => {
    setOpen((current) => !current);
    setUnread(false);
  };

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { id: idRef.current++, role: "user", text }]);
    setTyping(true);

    const reply: BotReply = getBotReply(text);
    window.setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: idRef.current++,
            role: "bot",
            text: reply.text,
            products: reply.products,
            suggestions: reply.suggestions,
          },
        ]);
        if (!open) setUnread(true);
      },
      750 + Math.random() * 600
    );
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Aiza"}
        className="fixed bottom-5 right-5 z-[75] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark text-ink shadow-xl shadow-gold/25 md:bottom-6 md:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40 [animation-duration:2.2s]" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Aiza shopping assistant"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-3 right-3 z-[76] flex h-[min(72svh,40rem)] overflow-hidden rounded-[1.5rem] border border-gold/25 bg-charcoal/98 shadow-[0_30px_100px_-18px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:left-auto sm:w-[24rem]"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-r from-gold/[0.11] to-transparent px-4 py-3.5">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink">
                  <Sparkles className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-charcoal bg-emerald-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg text-cream">Aiza</h2>
                    <BadgeCheck className="h-3.5 w-3.5 text-gold" aria-label="Verified shopping assistant" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold-light/80">Online · Ready to help</p>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:border-gold/50 hover:text-gold">
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
                {messages.map((message) => (
                  <div key={message.id} className={message.role === "user" ? "flex justify-end" : "space-y-3"}>
                    {message.role === "bot" && (
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 max-w-[88%]">
                          <div className="rounded-2xl rounded-tl-sm border border-white/[0.07] bg-white/[0.045] px-4 py-3 text-[13px] leading-6 text-cream/90">
                            {message.text}
                          </div>
                          {message.products && message.products.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.products.map((product) => (
                                <article key={product.id} className="overflow-hidden rounded-xl border border-white/[0.08] bg-ink/60">
                                  <div className="flex gap-3 p-2.5">
                                    <Image src={product.images[0]} alt={product.name} width={54} height={68} className="h-[4.25rem] w-14 rounded-lg object-cover" />
                                    <div className="min-w-0 flex-1">
                                      <Link href={`/product/${product.slug}`} onClick={() => setOpen(false)} className="line-clamp-1 font-display text-sm text-cream transition hover:text-gold">
                                        {product.name}
                                      </Link>
                                      <p className="mt-1 text-xs font-semibold text-gold">{formatPrice(product.price)}</p>
                                      <p className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${product.inStock ? "text-emerald-400" : "text-rose-400"}`}>
                                        {product.inStock ? "● In stock" : "○ Currently unavailable"}
                                      </p>
                                    </div>
                                  </div>
                                  {product.inStock && (
                                    <button type="button" onClick={() => addToCart(product)} className="flex w-full items-center justify-center gap-2 border-t border-white/[0.07] py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-gold/[0.07]">
                                      <ShoppingBag className="h-3 w-3" /> Add to cart
                                    </button>
                                  )}
                                </article>
                              ))}
                            </div>
                          )}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {message.suggestions.map((suggestion) => (
                                <button key={suggestion} type="button" onClick={() => send(suggestion)} className="rounded-full border border-gold/25 bg-gold/[0.055] px-3 py-1.5 text-[10px] font-medium text-gold-light transition hover:border-gold/60 hover:bg-gold/10">
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {message.role === "user" && (
                      <div className="max-w-[82%] rounded-2xl rounded-br-sm bg-gold px-4 py-2.5 text-[13px] font-medium leading-5 text-ink shadow-lg shadow-gold/10">
                        {message.text}
                      </div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Sparkles className="h-3.5 w-3.5" /></span>
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/[0.07] bg-white/[0.045] px-4 py-3.5">
                      {[0, 1, 2].map((dot) => <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-gold/70" animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }} />)}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/[0.07] bg-ink/35 p-3">
                <div className="no-scrollbar mb-2.5 flex gap-2 overflow-x-auto">
                  {QUICK_CHIPS.map((chip) => (
                    <button key={chip} type="button" onClick={() => send(chip)} className="shrink-0 rounded-full border border-white/[0.09] px-3 py-1.5 text-[10px] text-cream/65 transition hover:border-gold/50 hover:text-gold">
                      {chip}
                    </button>
                  ))}
                </div>
                <form onSubmit={(event) => { event.preventDefault(); send(); }} className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] p-1.5 pl-4 transition focus-within:border-gold/55 focus-within:shadow-[0_0_0_3px_rgba(212,175,55,0.07)]">
                  <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about products, prices or stock…" aria-label="Message Aiza" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-cream outline-none placeholder:text-cream/30" />
                  <button type="submit" disabled={!input.trim() || typing} aria-label="Send message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-35">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                <p className="mt-2 text-center text-[9px] text-muted/60">Product information is current as of today · Pay only on delivery</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleChat}
        aria-label={open ? "Close chat" : "Chat with Aiza"}
        className="fixed bottom-5 right-5 z-[75] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark text-ink shadow-xl shadow-gold/25 md:bottom-6 md:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40 [animation-duration:2.2s]" />}
        {unread && <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-ink bg-emerald-400" />}
        {!open && <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-gold/20 bg-charcoal/95 px-3.5 py-2 text-[11px] font-medium text-cream opacity-0 shadow-xl backdrop-blur transition-opacity hover:opacity-100 md:block">Ask Aiza</span>}
      </motion.button>
    </>
  );
}