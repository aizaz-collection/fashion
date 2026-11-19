"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Eye, Heart, HeartFilled, ShoppingBag, Star } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

function badgeStyle(badge: NonNullable<Product["badge"]>): string {
  if (badge === "New") return "bg-gold text-ink";
  if (badge === "Bestseller") return "bg-cream text-ink";
  return "border border-gold/50 bg-ink/85 text-gold backdrop-blur-md";
}

type ShopProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
};

export default function ShopProductCard({ product, onQuickView }: ShopProductCardProps) {
  const { addToCart, buyNow, toggleWishlist, isWishlisted } = useStore();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.article
      whileHover={{ y: -7, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-charcoal/90 shadow-[0_16px_50px_-28px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gold/35 hover:shadow-[0_28px_70px_-26px_rgba(0,0,0,0.95),0_0_40px_-24px_rgba(212,175,55,0.35)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">View {product.name}</span>
        </Link>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 28vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name}, alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 28vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:opacity-100"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,0.12),transparent_38%)]" />

        {product.badge && (
          <span
            className={`absolute left-3.5 top-3.5 z-20 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] ${badgeStyle(product.badge)}`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute right-3.5 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition duration-300 hover:scale-110 ${
            wished
              ? "border-gold/60 bg-gold/15 text-gold"
              : "border-white/15 bg-ink/65 text-cream/75 hover:border-gold/55 hover:text-gold"
          }`}
        >
          {wished ? <HeartFilled className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
        </button>

        <motion.button
          type="button"
          onClick={() => onQuickView(product)}
          whileTap={{ scale: 0.94 }}
          aria-label={`Quick view ${product.name}`}
          className="absolute bottom-3.5 right-3.5 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/80 px-3.5 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-cream opacity-100 shadow-xl backdrop-blur-md transition duration-300 hover:border-gold/60 hover:text-gold md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Quick view</span>
        </motion.button>
      </div>


      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-gold/80">
          {product.category}
        </p>
        <Link href={`/product/${product.slug}`} className="mt-1.5 block">
          <h3 className="font-display text-lg leading-snug text-cream transition-colors duration-300 group-hover:text-gold sm:text-xl">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex items-center gap-1 text-gold">
            <Star className="h-3 w-3" />
            <span className="text-[11px] font-semibold">{product.rating.toFixed(1)}</span>
          </span>
          <span className="text-[10px] text-muted">({product.reviews})</span>
          {product.colors && (
            <span className="ml-auto flex -space-x-1.5">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="h-3.5 w-3.5 rounded-full border-2 border-charcoal shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </span>
          )}
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gold">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <>
              <span className="text-xs text-muted line-through">{formatPrice(product.oldPrice)}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gold-light">−{discount}%</span>
            </>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-5">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink shadow-lg shadow-black/30 transition duration-300 hover:bg-gold-light hover:shadow-gold/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {product.inStock ? "Add to Cart" : "Sold out"}
          </button>
          <motion.button
            type="button"
            onClick={() => onQuickView(product)}
            whileTap={{ scale: 0.92 }}
            aria-label={`Quick view ${product.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-cream/70 transition duration-300 hover:border-gold/50 hover:text-gold"
          >
            <Eye className="h-4 w-4" />
          </motion.button>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              buyNow(product);
              router.push("/checkout");
            }}
            className="mt-2 w-full rounded-full border border-gold/35 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-gold/[0.07] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Buy now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
