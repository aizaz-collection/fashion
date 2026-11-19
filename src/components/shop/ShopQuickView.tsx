"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Check, Heart, HeartFilled, ShoppingBag, Star, X } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type ShopQuickViewProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ShopQuickView({ product, onClose }: ShopQuickViewProps) {
  const { addToCart, buyNow, toggleWishlist, isWishlisted } = useStore();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();

  useEffect(() => {
    if (!product) return;
    setActiveImage(0);
    setSelectedSize(product.sizes?.[0]);
    setSelectedColor(product.colors?.[0]?.name);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[1.75rem] border border-gold/20 bg-charcoal shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)] sm:max-h-[88svh] sm:rounded-[1.75rem] md:grid-cols-[1.05fr_0.95fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink/70 text-cream backdrop-blur-md transition hover:border-gold/50 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative min-h-[22rem] overflow-hidden bg-surface sm:min-h-[34rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${product.id}-${activeImage}`}
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage] ?? product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 52vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`relative h-14 w-12 overflow-hidden rounded-lg border transition ${
                        activeImage === index
                          ? "border-gold shadow-[0_0_18px_rgba(212,175,55,0.25)]"
                          : "border-white/15 opacity-65 hover:opacity-100"
                      }`}
                    >
                      <Image src={image} alt="" fill sizes="48px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-8 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                {product.category} · {product.badge ?? "Signature edit"}
              </p>
              <h2 id="quick-view-title" className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">
                {product.name}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-gold">
                  <Star className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
                </span>
                <span className="text-xs text-muted">{product.reviews} considered reviews</span>
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-gold">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-sm text-muted line-through">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">{product.description}</p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream">Size</p>
                    {selectedSize && <span className="text-xs text-gold">Selected: {selectedSize}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={selectedSize === size}
                        className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-xs font-semibold transition ${
                          selectedSize === size
                            ? "border-gold bg-gold text-ink"
                            : "border-white/10 text-cream/70 hover:border-gold/50 hover:text-gold"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream">Colour</p>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        aria-label={`Select ${color.name}`}
                        aria-pressed={selectedColor === color.name}
                        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] transition ${
                          selectedColor === color.name
                            ? "border-gold/60 bg-gold/[0.08] text-cream"
                            : "border-white/10 text-muted hover:border-gold/35"
                        }`}
                      >
                        <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-7 flex gap-2.5">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product, 1, selectedSize, selectedColor)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-lg shadow-black/30 transition hover:bg-gold-light active:scale-[0.98] disabled:opacity-50"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Sold out"}
                </button>
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => {
                    buyNow(product, 1, selectedSize, selectedColor);
                    onClose();
                    router.push("/checkout");
                  }}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-gold/35 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold/[0.07] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition hover:scale-105 ${
                    isWishlisted(product.id)
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : "border-white/10 text-cream/70 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {isWishlisted(product.id) ? <HeartFilled className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.07] pt-5 text-[10px] uppercase tracking-[0.12em] text-muted">
                <span className="inline-flex items-center gap-1.5 text-gold/80">
                  <Check className="h-3.5 w-3.5" /> Cash on delivery
                </span>
                <span>Quality assured</span>
              </div>
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold transition hover:text-gold-light"
              >
                View full details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


