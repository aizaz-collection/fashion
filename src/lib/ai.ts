import { categories, products } from "./data";
import type { Product } from "./types";

/**
 * ─── AIZA — the AI style assistant ─────────────────────────────────
 * A fast, offline intent engine + product search. No API key needed.
 * To upgrade to a real LLM later, replace getBotReply() with an API
 * call and pass products as context — the UI already renders the
 * `products` array returned here as rich cards.
 * ───────────────────────────────────────────────────────────────────
 */

export type BotReply = {
  text: string;
  products?: Product[];
  suggestions?: string[];
};

const WHATSAPP = "+92 300 1234567";

const DEFAULT_SUGGESTIONS = [
  "Product prices",
  "Stock availability",
  "Cash on Delivery",
  "Delivery time",
  "Best sellers",
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  men: ["men", "mans", "man", "mens", "male", "him", "his", "gentleman", "suit", "shirt", "jacket", "sweater", "kurta"],
  women: ["women", "womens", "woman", "female", "her", "dress", "gown", "maxi", "cardigan", "ladies", "abaya"],
  accessories: ["accessor", "watch", "bag", "handbag", "purse", "sunglass", "glasses", "eyewear", "jewel"],
  fragrances: ["fragrance", "perfume", "attar", "scent", "oud", "spray", "parfum", "smell", "aroma"],
};

function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2);

  const scored = products
    .map((p) => {
      const haystack = `${p.name} ${p.category} ${p.description}`.toLowerCase();
      let score = 0;
      if (p.name.toLowerCase().includes(q)) score += 6;
      if (haystack.includes(q)) score += 3;
      for (const t of tokens) if (haystack.includes(t)) score += 2;
      for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
        if (p.category === cat && words.some((w) => q.includes(w))) score += 2;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((x) => x.p);
}

function byCategory(cat: string): Product[] {
  return products.filter((p) => p.category === cat).slice(0, 3);
}

function bestSellers(): Product[] {
  return products.filter((p) => p.badge === "Bestseller").slice(0, 3);
}

function newArrivals(): Product[] {
  return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
}

function onSale(): Product[] {
  return products.filter((p) => p.oldPrice).slice(0, 3);
}

export function getBotReply(raw: string): BotReply {
  const q = raw.toLowerCase().trim();

  if (/^(hi|hello|hey|salam|assalam|aoa|good (morning|evening|afternoon)|yo)\b/.test(q)) {
    return {
      text: "Hello! ✦ Welcome to Aizaz Collections. I'm Aiza, your personal style assistant. Ask me about products, prices, delivery or Cash on Delivery — how may I help?",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (/(thank|shukriya|thanks|great|awesome|nice|love it)/.test(q)) {
    return {
      text: "You're most welcome! ✦ If there's anything else — sizing, prices, delivery — just ask. Happy shopping!",
      suggestions: ["Show best sellers", "What's new?"],
    };
  }

  if (/(bye|khuda hafiz|goodbye|see you|later)/.test(q)) {
    return {
      text: "Until next time! ✦ Remember — every order is Cash on Delivery, so you only pay when luxury arrives at your door. ✨",
    };
  }

  if (/(cod|cash on deliver|cash on delivery|payment|pay\b|online payment|card|easypaisa|jazzcash|bank transfer)/.test(q)) {
    return {
      text: "We offer 100% Cash on Delivery. Here is how it works: 1) Add your pieces to the cart and choose Buy Now or go to checkout. 2) Enter your name, phone number and delivery address. 3) Confirm your COD order—no advance payment or card details are needed. 4) When the parcel arrives, inspect it and pay the courier in cash. Delivery takes 2–4 working days nationwide.",
      suggestions: ["Delivery time", "Product prices", "Stock availability"],
    };
  }

  if (/(avail|stock|in stock|available|availability|ready|ship yet)/.test(q)) {
    const cleanedQuery = q.replace(/\b(is|are|the|a|an|you|have|any|still|currently|now|in|stock|available|availability|please|show|me|products?|pieces?|item)\b/g, " ");
    const found = searchProducts(cleanedQuery);
    if (found.length > 0) {
      return {
        text: "Here is the latest availability and price. Items marked in stock are ready to dispatch; COD is available on every piece.",
        products: found,
        suggestions: ["Cash on Delivery", "Delivery time", "Show best sellers"],
      };
    }
    const available = products.filter((product) => product.inStock);
    return {
      text: `Good news—${available.length} of our ${products.length} pieces are currently in stock. Here are the available products:`,
      products: available.slice(0, 4),
      suggestions: ["Product prices", "Cash on Delivery", "Show best sellers"],
    };
  }

  if (/(deliver|shipping|ship|courier|how long|days|arrive|receive|tracking|track)/.test(q)) {
    return {
      text: "Delivery takes 2–4 working days nationwide. 🚚 Shipping is FREE on orders over Rs 5,000 (just Rs 199 otherwise). Every order is confirmed by phone before dispatch — and remember, you only pay on delivery.",
      suggestions: ["Cash on delivery", "Return policy", "Show new arrivals"],
    };
  }

  if (/(return|refund|exchange|replace|damaged|wrong item|size issue|warranty)/.test(q)) {
    return {
      text: "Your satisfaction is guaranteed: 7-day easy exchange. ✦ If a piece isn't perfect, contact us within 7 days of delivery and we'll arrange an exchange or refund — quality issues are always on us.",
      suggestions: ["Contact support", "Show best sellers"],
    };
  }

  if (/(discount|sale|offer|deal|cheap|bargain|kami|price down)/.test(q)) {
    return {
      text: "Yes! ✦ These pieces are currently on special reduced prices — grab them before they're gone:",
      products: onSale(),
      suggestions: ["Show best sellers", "New arrivals"],
    };
  }

  if (/(best|popular|trending|top|famous|recommended|recommend)/.test(q)) {
    return {
      text: "Our most-loved pieces, adored by thousands of customers across Pakistan: ✦",
      products: bestSellers(),
      suggestions: ["New arrivals", "On sale?"],
    };
  }

  if (/(new|latest|fresh|arrivals|just in|naya)/.test(q)) {
    return {
      text: "Fresh off the runway — our newest arrivals: ✨",
      products: newArrivals(),
      suggestions: ["Best sellers", "On sale?"],
    };
  }

  if (/(contact|support|help ?line|helpline|phone|whatsapp|email|call|human|agent|number)/.test(q)) {
    return {
      text: `Our team would love to help! 📞 Call or WhatsApp us at ${WHATSAPP} (Mon–Sat, 10am–8pm), or email hello@aizazcollections.com. You can also use the Contact page — we reply within a few hours.`,
      suggestions: ["Delivery time", "Cash on delivery"],
    };
  }

  if (/(size|sizing|fit|measurement)/.test(q)) {
    return {
      text: "Sizing made simple: each product page lists available sizes with a true-to-fit cut. Between sizes? Size up for relaxed tailoring, or message us on WhatsApp — our stylists will find your perfect fit. 👔",
      suggestions: ["Show best sellers", "Return policy"],
    };
  }

  if (/(price|rate|cost|how much|kitna|qimat|pricing)/.test(q)) {
    const found = searchProducts(q.replace(/(price|rate|cost|how much is|how much|of|the|kitna|qimat|hai|pricing|\?)/g, " "));
    if (found.length > 0) {
      return {
        text: "Here are the matching pieces with their current prices. You can add any in-stock item directly to your cart, or open it to review size, colour and full details.",
        products: found,
        suggestions: ["Stock availability", "Cash on Delivery", "Delivery time"],
      };
    }
    return {
      text: "I couldn't identify that exact piece, but here are some customer favourites with current prices:",
      products: bestSellers(),
      suggestions: ["Show all best sellers", "Cash on Delivery"],
    };
  }

  // Category intent
  for (const cat of categories) {
    const words = CATEGORY_KEYWORDS[cat.slug] ?? [cat.slug];
    if (words.some((w) => q.includes(w))) {
      return {
        text: `Here are highlights from our ${cat.name} collection — ${cat.tagline.toLowerCase()}: ✦`,
        products: byCategory(cat.slug),
        suggestions: ["Show best sellers", "New arrivals"],
      };
    }
  }

  // Generic product search
  const found = searchProducts(q);
  if (found.length > 0) {
    return {
      text: "I found these pieces for you: ✦",
      products: found,
      suggestions: ["Show best sellers", "Delivery time"],
    };
  }

  return {
    text: "I'm not fully sure I understood, but I'd love to help! ✦ Ask me about Cash on Delivery, delivery time, returns, sizing — or say \"show me watches\" / \"best sellers\" and I'll fetch our finest pieces.",
    suggestions: DEFAULT_SUGGESTIONS,
  };
}
