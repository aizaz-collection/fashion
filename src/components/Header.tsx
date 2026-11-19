"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { Menu, Search, ShoppingBag, Heart, X, Banknote } from "@/components/icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Badge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="absolute -right-1.5 -top-1.5"
        >
          <motion.span
            key={count}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink"
          >
            {count}
          </motion.span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const { cartCount, wishlist, mounted } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide header when scrolling down, reveal when scrolling up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 140 && !searchOpen);
  });

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q))
      .slice(0, 5);
  }, [query]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="border-b border-gold/15 bg-gradient-to-r from-transparent via-gold/[0.08] to-transparent py-2">
        <p className="text-center text-[11px] tracking-[0.18em] text-gold-light/90">
          ✦ CASH ON DELIVERY NATIONWIDE · FREE SHIPPING OVER RS 5,000 ✦
        </p>
      </div>

      {/* Sticky main nav — hides on scroll down, returns on scroll up */}
      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b border-white/5 bg-ink/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] lg:px-8">
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-wide text-gold-gradient transition-opacity group-hover:opacity-85 md:text-[26px]">
              AIZAZ
            </span>
            <span className="text-[9px] tracking-[0.42em] text-cream/60">COLLECTIONS</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-[13px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-gold ${
                  pathname === item.href ? "active text-gold" : "text-cream/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/5 hover:text-gold"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/5 hover:text-gold"
            >
              <Heart className="h-5 w-5" />
              {mounted && <Badge count={wishlist.length} />}
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/5 hover:text-gold"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && <Badge count={cartCount} />}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/5 hover:text-gold md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search overlay with live results */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-full border-b border-white/10 bg-ink/95 backdrop-blur-2xl"
            >
              <div className="mx-auto max-w-3xl px-4 py-8">
                <form onSubmit={submitSearch} className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search suits, gowns, watches, fragrances…"
                    className="w-full rounded-full border border-white/12 bg-white/5 py-4 pl-14 pr-12 text-sm text-cream outline-none transition placeholder:text-cream/30 focus:border-gold/60 focus:bg-white/[0.07]"
                  />
                  <button
                    type="button"
                    aria-label="Close search"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 transition hover:text-gold"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </form>
                {results.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          className="flex items-center gap-4 rounded-2xl p-2.5 transition hover:bg-white/5"
                        >
                          <span className="relative block h-14 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10">
                            <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm text-cream">{p.name}</span>
                            <span className="block text-xs uppercase tracking-widest text-muted">{p.category}</span>
                          </span>
                          <span className="text-sm font-semibold text-gold">{formatPrice(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {query.trim() && results.length === 0 && (
                  <p className="mt-6 text-center text-sm text-muted">
                    No pieces found for “{query}” — try “watch”, “silk” or “oud”.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-[71] flex h-full w-[300px] flex-col border-l border-white/10 bg-charcoal px-7 py-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold text-gold-gradient">AIZAZ</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-cream/70 transition hover:text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {[...NAV, { href: "/wishlist", label: "Wishlist" }].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-3.5 font-display text-2xl transition-colors hover:bg-white/5 hover:text-gold ${
                        pathname === item.href ? "text-gold" : "text-cream/90"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-auto"
              >
                <div className="flex items-center gap-2.5 rounded-2xl border border-gold/25 bg-gold/5 p-4">
                  <Banknote className="h-5 w-5 shrink-0 text-gold" />
                  <p className="text-xs leading-relaxed text-gold-light/90">
                    100% Cash on Delivery — pay when your order arrives.
                  </p>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}