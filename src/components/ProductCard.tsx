"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Heart, HeartFilled, ShoppingBag, Star } from "@/components/icons";

function badgeStyle(badge: NonNullable<Product["badge"]>): string {
  switch (badge) {
    case "New":
      return "bg-gold text-ink";
    case "Bestseller":
      return "bg-cream/95 text-ink";
    case "Sale":
      return "border border-gold/60 bg-ink/85 text-gold";
  }
}

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, buyNow, toggleWishlist, isWishlisted } = useStore();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="block overflow-hidden rounded-2xl border border-white/8 bg-charcoal transition-colors duration-500 group-hover:border-gold/40">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">View {product.name}</span>
        </Link>
        {/* Image with hover crossfade to second angle */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/85 to-transparent" />

          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeStyle(product.badge)}`}
            >
              {product.badge}
            </span>
          )}

          {/* Quick add — slides up on hover, always visible on touch */}
          <div className="absolute inset-x-3 bottom-3 z-20 translate-y-14 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="relative z-20 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink shadow-lg shadow-black/40 transition hover:bg-gold-light active:scale-[0.98]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">
            {product.category}
          </p>
          <h3 className="mt-1.5 font-display text-lg leading-snug text-cream transition-colors group-hover:text-gold">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 text-gold">
              <Star className="h-3 w-3" />
              <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
            </span>
            <span className="text-[11px] text-muted">({product.reviews})</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-xs text-muted line-through">{formatPrice(product.oldPrice)}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                  −{discount}%
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              buyNow(product);
              router.push("/checkout");
            }}
            className="relative z-20 mt-4 w-full rounded-full border border-gold/35 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gold transition hover:bg-gold/[0.07] active:scale-[0.98]"
          >
            Buy now
          </button>
        </div>
      </div>

      {/* Wishlist toggle */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product)}
        className={`absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
          wished
            ? "border-gold/60 bg-gold/15 text-gold"
            : "border-white/10 bg-ink/70 text-cream/70 hover:border-gold/50 hover:text-gold"
        }`}
      >
        {wished ? <HeartFilled className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
      </motion.button>
    </motion.div>
  );
}