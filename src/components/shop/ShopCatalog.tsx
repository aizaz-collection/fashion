"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Package,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  X,
} from "@/components/icons";
import { categories, products } from "@/lib/data";
import type { Product } from "@/lib/types";
import ShopFilters, {
  type CategoryFilter,
  type PriceBand,
  type ShopFilterOption,
} from "@/components/shop/ShopFilters";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopQuickView from "@/components/shop/ShopQuickView";

type SortOption = "newest" | "price-low" | "price-high" | "rating" | "name";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
  { value: "name", label: "Name: A–Z" },
];

const priceBandLabels: Record<PriceBand, string> = {
  all: "All prices",
  "under-5000": "Under Rs 5,000",
  "5000-10000": "Rs 5,000 – Rs 10,000",
  "10000-20000": "Rs 10,000 – Rs 20,000",
  "20000-plus": "Rs 20,000 & above",
};

function matchesPriceBand(price: number, band: PriceBand): boolean {
  if (band === "all") return true;
  if (band === "under-5000") return price < 5000;
  if (band === "5000-10000") return price >= 5000 && price <= 10000;
  if (band === "10000-20000") return price > 10000 && price <= 20000;
  return price > 20000;
}

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const requestedCategory = searchParams.get("category");
  const initialCategory: CategoryFilter = categories.some((item) => item.slug === requestedCategory)
    ? (requestedCategory as CategoryFilter)
    : "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  useEffect(() => {
    const nextCategory = searchParams.get("category");
    const nextQuery = searchParams.get("q") ?? "";
    setCategory(categories.some((item) => item.slug === nextCategory) ? (nextCategory as CategoryFilter) : "all");
    setQuery(nextQuery);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("category", category);
    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [category, pathname, query, router]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFiltersOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileFiltersOpen]);

  const categoryOptions = useMemo<ShopFilterOption[]>(
    () => [
      { value: "all", label: "All pieces", count: products.length },
      ...categories.map((item) => ({
        value: item.slug,
        label: item.name,
        count: products.filter((product) => product.category === item.slug).length,
      })),
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matching = products.filter((product) => {
      const categoryName = categories.find((item) => item.slug === product.category)?.name ?? product.category;
      const searchableText = `${product.name} ${categoryName} ${product.description}`.toLowerCase();
      return (
        (category === "all" || product.category === category) &&
        matchesPriceBand(product.price, priceBand) &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });

    return [...matching].sort((first, second) => {
      if (sort === "price-low") return first.price - second.price;
      if (sort === "price-high") return second.price - first.price;
      if (sort === "rating") return second.rating - first.rating;
      if (sort === "name") return first.name.localeCompare(second.name);
      return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
    });
  }, [category, priceBand, query, sort]);

  const hasActiveFilters = category !== "all" || priceBand !== "all" || query.trim().length > 0;
  const activeFilterCount =
    Number(category !== "all") + Number(priceBand !== "all") + Number(query.trim().length > 0);

  const resetFilters = () => {
    setCategory("all");
    setPriceBand("all");
    setQuery("");
  };


  return (
    <div className="min-h-screen bg-ink">
      <section className="relative isolate overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_56%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="pointer-events-none absolute left-[8%] top-12 h-64 w-64 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute right-[10%] top-20 h-40 w-40 rounded-full border border-gold/[0.07]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-7xl px-4 text-center lg:px-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold">
            The complete collection
          </p>
          <h1 className="mx-auto mt-5 max-w-5xl font-display text-4xl leading-[1.06] text-cream sm:text-5xl md:text-7xl">
            Curated for those who <span className="text-gold-gradient italic">choose exceptional</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base">
            Explore every signature piece—from midnight tailoring to rare oud. Each arrival is selected
            for uncompromising quality, enduring style, and a presence that speaks quietly.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Quality assured</span>
            <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Nationwide delivery</span>
            <span className="inline-flex items-center gap-2"><Package className="h-4 w-4 text-gold" /> Cash on delivery</span>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-9 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ShopFilters
                category={category}
                onCategoryChange={setCategory}
                priceBand={priceBand}
                onPriceBandChange={setPriceBand}
                categoryOptions={categoryOptions}
                hasActiveFilters={hasActiveFilters}
                onReset={resetFilters}
              />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="group relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/80" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the collection…"
                  aria-label="Search products"
                  className="h-14 w-full rounded-full border border-white/[0.09] bg-charcoal/80 pl-11 pr-11 text-sm text-cream outline-none transition duration-300 placeholder:text-muted/70 focus:border-gold/55 focus:bg-charcoal focus:shadow-[0_0_0_4px_rgba(212,175,55,0.07)]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-gold"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="relative inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-charcoal/80 px-5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream transition hover:border-gold/45 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 text-gold" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-ink">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <div className="relative min-w-0 flex-1 sm:w-52 sm:flex-none">
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortOption)}
                    aria-label="Sort products"
                    className="h-14 w-full appearance-none rounded-full border border-white/[0.09] bg-charcoal/80 px-5 pr-10 text-[10px] font-bold uppercase tracking-[0.12em] text-cream outline-none transition hover:border-gold/35 focus:border-gold/55"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-charcoal text-cream">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  {hasActiveFilters ? "Curated results" : "The signature edit"}
                </p>
                <p aria-live="polite" className="mt-1.5 text-sm text-muted">
                  Showing <span className="font-semibold text-cream">{filteredProducts.length}</span> of {products.length} pieces
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold transition hover:text-gold-light"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <div className="mt-5 flex flex-wrap gap-2">
                {category !== "all" && (
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-3.5 py-2 text-[10px] font-semibold text-gold transition hover:border-gold/50"
                  >
                    {categoryOptions.find((option) => option.value === category)?.label}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {priceBand !== "all" && (
                  <button
                    type="button"
                    onClick={() => setPriceBand("all")}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-3.5 py-2 text-[10px] font-semibold text-gold transition hover:border-gold/50"
                  >
                    {priceBandLabels[priceBand]}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {query.trim() && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-3.5 py-2 text-[10px] font-semibold text-gold transition hover:border-gold/50"
                  >
                    “{query.trim()}”
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <motion.div layout className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 24, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.97 }}
                      transition={{
                        duration: 0.42,
                        delay: Math.min(index, 8) * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      }}
                    >
                      <ShopProductCard product={product} onQuickView={setQuickViewProduct} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-7 flex min-h-[28rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-gold/20 bg-gold/[0.025] px-5 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06] text-gold">
                  <Search className="h-6 w-6" />
                </div>
                <h2 className="mt-6 font-display text-3xl text-cream">No pieces found</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                  Our edit is intentionally exclusive. Try another search or relax your filters to discover more.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-7 rounded-full bg-gold px-7 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light"
                >
                  Reset the edit
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>


      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className="fixed inset-0 z-[85] bg-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMobileFiltersOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-[min(88vw,22rem)] overflow-y-auto border-r border-gold/20 bg-charcoal px-6 py-7 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold">Your selection</p>
                  <h2 className="mt-1 font-display text-2xl text-cream">Filter the collection</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream transition hover:border-gold/50 hover:text-gold"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ShopFilters
                category={category}
                onCategoryChange={setCategory}
                priceBand={priceBand}
                onPriceBandChange={setPriceBand}
                categoryOptions={categoryOptions}
                hasActiveFilters={hasActiveFilters}
                onReset={resetFilters}
              />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-8 w-full rounded-full bg-gold py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light"
              >
                Show {filteredProducts.length} pieces
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ShopQuickView product={quickViewProduct} onClose={closeQuickView} />
    </div>
  );
}


