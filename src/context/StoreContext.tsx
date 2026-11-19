"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "@/components/icons";
import type { CartItem, Order, Product } from "@/lib/types";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/format";

type ToastItem = { id: number; message: string };

interface StoreValue {
  mounted: boolean;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, qty?: number, size?: string, color?: string) => void;
  buyNow: (product: Product, qty?: number, size?: string, color?: string) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
  lastOrder: Order | null;
  placeOrder: (customer: Order["customer"]) => Order;
  toast: (message: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    setCart(load("aizaz-cart", []));
    setWishlist(load("aizaz-wishlist", []));
    setRecentlyViewed(load("aizaz-recent", []));
    setLastOrder(load<Order | null>("aizaz-last-order", null));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) window.localStorage.setItem("aizaz-cart", JSON.stringify(cart));
  }, [cart, mounted]);
  useEffect(() => {
    if (mounted) window.localStorage.setItem("aizaz-wishlist", JSON.stringify(wishlist));
  }, [wishlist, mounted]);
  useEffect(() => {
    if (mounted) window.localStorage.setItem("aizaz-recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed, mounted]);
  useEffect(() => {
    if (mounted) window.localStorage.setItem("aizaz-last-order", JSON.stringify(lastOrder));
  }, [lastOrder, mounted]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1, size?: string, color?: string) => {
      const key = `${product.id}|${size ?? ""}|${color ?? ""}`;
      setCart((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, qty: Math.min(i.qty + qty, 20) } : i
          );
        }
        return [...prev, { key, product, qty, size, color }];
      });
      toast(`${product.name} added to cart`);
    },
    [toast]
  );

  const buyNow = useCallback(
    (product: Product, qty = 1, size?: string, color?: string) => {
      const key = `${product.id}|${size ?? ""}|${color ?? ""}`;
      setCart([{ key, product, qty, size, color }]);
      toast(`${product.name} is ready for checkout`);
    },
    [toast]
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, 20) } : i))
    );
  }, []);

  const removeFromCart = useCallback(
    (key: string) => {
      setCart((prev) => prev.filter((i) => i.key !== key));
      toast("Item removed from cart");
    },
    [toast]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const has = prev.includes(product.id);
        if (has) {
          toast(`${product.name} removed from wishlist`);
          return prev.filter((id) => id !== product.id);
        }
        toast(`${product.name} saved to wishlist ♥`);
        return [...prev, product.id];
      });
    },
    [toast]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)];
      return next.slice(0, 8);
    });
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty * i.product.price, 0),
    [cart]
  );

  const placeOrder = useCallback(
    (customer: Order["customer"]): Order => {
      const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
      const order: Order = {
        id: `AC-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`,
        items: cart.map(({ product, qty, size, color }) => ({
          productId: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          qty,
          size,
          color,
        })),
        subtotal: cartTotal,
        shipping,
        total: cartTotal + shipping,
        customer,
        paymentMethod: "Cash on Delivery",
        date: new Date().toISOString(),
      };
      setLastOrder(order);
      setCart([]);
      return order;
    },
    [cart, cartTotal]
  );

  const value: StoreValue = {
    mounted,
    cart,
    cartCount,
    cartTotal,
    addToCart,
    buyNow,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
    recentlyViewed,
    addRecentlyViewed,
    lastOrder,
    placeOrder,
    toast,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      {/* Toast notifications */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 flex-col items-center">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="mb-2 flex items-center gap-2.5 rounded-full border border-gold/30 bg-charcoal/95 px-5 py-3 shadow-2xl shadow-black/60 backdrop-blur-xl"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-ink">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-sm text-cream">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}