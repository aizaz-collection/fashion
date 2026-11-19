"use client";

import { ChevronDown, RefreshCcw, SlidersHorizontal } from "@/components/icons";
import { formatPrice } from "@/lib/format";

export type PriceBand = "all" | "under-5000" | "5000-10000" | "10000-20000" | "20000-plus";
export type CategoryFilter = "all" | string;

export type ShopFilterOption = {
  value: string;
  label: string;
  count: number;
};

type ShopFiltersProps = {
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  priceBand: PriceBand;
  onPriceBandChange: (value: PriceBand) => void;
  categoryOptions: ShopFilterOption[];
  hasActiveFilters: boolean;
  onReset: () => void;
};

const priceOptions: { value: PriceBand; label: string }[] = [
  { value: "all", label: "All prices" },
  { value: "under-5000", label: `Under ${formatPrice(5000)}` },
  { value: "5000-10000", label: `${formatPrice(5000)} – ${formatPrice(10000)}` },
  { value: "10000-20000", label: `${formatPrice(10000)} – ${formatPrice(20000)}` },
  { value: "20000-plus", label: `${formatPrice(20000)} & above` },
];

export default function ShopFilters({
  category,
  onCategoryChange,
  priceBand,
  onPriceBandChange,
  categoryOptions,
  hasActiveFilters,
  onReset,
}: ShopFiltersProps) {
  return (
    <div>
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-gold" />
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-cream">Refine</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold transition hover:text-gold-light"
          >
            <RefreshCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      <div className="border-b border-white/[0.07] pb-7">
        <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-muted">
          Category
        </h3>
        <div className="space-y-1">
          {categoryOptions.map((option) => {
            const active = category === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onCategoryChange(option.value)}
                aria-pressed={active}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "bg-gold/[0.11] text-gold"
                    : "text-cream/70 hover:bg-white/[0.04] hover:text-cream"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      active ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "bg-muted/40 group-hover:bg-gold/60"
                    }`}
                  />
                  {option.label}
                </span>
                <span className={`text-[10px] ${active ? "text-gold/70" : "text-muted/60"}`}>
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-7">
        <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-muted">
          Price range
        </h3>
        <div className="relative">
          <select
            value={priceBand}
            onChange={(event) => onPriceBandChange(event.target.value as PriceBand)}
            aria-label="Filter by price range"
            className="w-full appearance-none rounded-xl border border-white/[0.09] bg-charcoal px-4 py-3 pr-10 text-sm text-cream outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-charcoal text-cream">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gold/15 bg-gold/[0.045] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">The luxury promise</p>
        <p className="mt-2 text-xs leading-5 text-muted">
          Cash on delivery, nationwide delivery, and quality checked before dispatch.
        </p>
      </div>
    </div>
  );
}
