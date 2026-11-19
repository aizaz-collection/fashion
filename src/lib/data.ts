import type { Category, Product, Testimonial } from "./types";

/**
 * ─── PRODUCT CATALOG ────────────────────────────────────────────────
 * To use your own photos: drop files into /public/images/products and
 * update the `images` arrays below. 4:5 portrait (1200×1500) is ideal.
 * ────────────────────────────────────────────────────────────────────
 */

export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    tagline: "Tailored suits, leather & knitwear",
    image: "/images/categories/men.svg",
  },
  {
    slug: "women",
    name: "Women",
    tagline: "Gowns, dresses & elegant layers",
    image: "/images/categories/women.svg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Watches, bags & eyewear",
    image: "/images/categories/accessories.svg",
  },
  {
    slug: "fragrances",
    name: "Fragrances",
    tagline: "Oud, amber & signature scents",
    image: "/images/categories/fragrances.svg",
  },
];

export const products: Product[] = [
  {
    id: "p01",
    slug: "noir-signature-suit",
    name: "Noir Signature Suit",
    category: "men",
    price: 24999,
    oldPrice: 29999,
    images: ["/images/products/noir-signature-suit-1.svg", "/images/products/noir-signature-suit-2.svg"],
    description:
      "A masterfully tailored two-piece in deep midnight black. Cut from a premium Italian wool blend with half-canvas construction, the Noir Signature drapes flawlessly from boardroom to ballroom.",
    details: [
      "Premium Italian wool-blend suiting",
      "Half-canvas construction, slim tailored fit",
      "Full satin lining & functional cuff buttons",
      "Dry clean only",
    ],
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Midnight Black", hex: "#0b0b0d" },
      { name: "Charcoal", hex: "#33343a" },
    ],
    rating: 4.9,
    reviews: 212,
    badge: "Bestseller",
    featured: true,
    inStock: true,
    createdAt: "2026-09-18",
  },
  {
    id: "p02",
    slug: "midnight-leather-jacket",
    name: "Midnight Leather Jacket",
    category: "men",
    price: 18999,
    oldPrice: 22999,
    images: ["/images/products/midnight-leather-jacket-1.svg", "/images/products/midnight-leather-jacket-2.svg"],
    description:
      "Full-grain lambskin leather with a matte midnight finish. Butter-soft from day one, with antique gold hardware and a silhouette that sharpens every look.",
    details: [
      "100% full-grain lambskin leather",
      "Antique-gold YKK zippers",
      "Quilted satin inner lining",
      "Wipe clean with a damp cloth",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111114" },
      { name: "Espresso", hex: "#4b2e1e" },
    ],
    rating: 4.8,
    reviews: 167,
    featured: true,
    inStock: true,
    createdAt: "2026-10-02",
  },
  {
    id: "p03",
    slug: "ivory-cashmere-sweater",
    name: "Ivory Cashmere Sweater",
    category: "men",
    price: 9499,
    images: ["/images/products/ivory-cashmere-sweater-1.svg", "/images/products/ivory-cashmere-sweater-2.svg"],
    description:
      "Feather-light Mongolian cashmere blend in a warm ivory tone. The kind of quiet luxury that gets noticed without ever raising its voice.",
    details: [
      "70% cashmere, 30% merino wool",
      "Ribbed crew neck, cuffs & hem",
      "Naturally temperature regulating",
      "Hand wash cold, dry flat",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#f1ead8" },
      { name: "Camel", hex: "#c19a6b" },
    ],
    rating: 4.7,
    reviews: 98,
    badge: "New",
    featured: true,
    inStock: true,
    createdAt: "2026-11-08",
  },
  {
    id: "p04",
    slug: "onyx-formal-shirt",
    name: "Onyx Formal Shirt",
    category: "men",
    price: 4999,
    oldPrice: 5999,
    images: ["/images/products/onyx-formal-shirt-1.svg", "/images/products/onyx-formal-shirt-2.svg"],
    description:
      "Two-ply Egyptian cotton poplin with a liquid-soft hand feel. Non-iron finish, mother-of-pearl buttons and a collar that holds its shape all day.",
    details: [
      "Two-ply 100s Egyptian cotton poplin",
      "Non-iron easy-care finish",
      "Mother-of-pearl buttons",
      "Machine wash cold",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#f5f2ea" },
      { name: "Black", hex: "#101013" },
    ],
    rating: 4.6,
    reviews: 143,
    inStock: true,
    createdAt: "2026-08-21",
  },
  {
    id: "p05",
    slug: "aurelia-silk-gown",
    name: "Aurelia Silk Gown",
    category: "women",
    price: 21999,
    images: ["/images/products/aurelia-silk-gown-1.svg", "/images/products/aurelia-silk-gown-2.svg"],
    description:
      "Floor-sweeping mulberry silk with a bias-cut that pours over the body like liquid. Our most photographed piece — made for evenings that matter.",
    details: [
      "100% mulberry silk, bias cut",
      "Hidden side zipper & built-in lining",
      "Floor length with subtle train",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Emerald", hex: "#0f5132" },
      { name: "Wine", hex: "#722f37" },
      { name: "Black", hex: "#0b0b0d" },
    ],
    rating: 4.9,
    reviews: 176,
    badge: "Bestseller",
    featured: true,
    inStock: true,
    createdAt: "2026-09-30",
  },
  {
    id: "p06",
    slug: "golden-hour-maxi",
    name: "Golden Hour Maxi",
    category: "women",
    price: 12999,
    oldPrice: 15999,
    images: ["/images/products/golden-hour-maxi-1.svg", "/images/products/golden-hour-maxi-2.svg"],
    description:
      "A champagne-gold chiffon maxi with hand-finished pleats that catch every ray of light. Movement, glamour and grace in a single dress.",
    details: [
      "Layered chiffon with satin slip",
      "Hand-pleated skirt panel",
      "Elastic smocked back for fit",
      "Gentle hand wash",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gold", hex: "#d4af37" },
      { name: "Champagne", hex: "#f7e7ce" },
    ],
    rating: 4.8,
    reviews: 134,
    badge: "New",
    featured: true,
    inStock: true,
    createdAt: "2026-11-12",
  },
  {
    id: "p07",
    slug: "velvet-rose-dress",
    name: "Velvet Rose Dress",
    category: "women",
    price: 15499,
    images: ["/images/products/velvet-rose-dress-1.svg", "/images/products/velvet-rose-dress-2.svg"],
    description:
      "Crushed velvet in a dusty rose hue with a softly draped cowl neckline. Romantic, rich and impossibly photogenic under evening light.",
    details: [
      "Premium crushed velvet",
      "Cowl neckline, midi length",
      "Concealed back zipper",
      "Dry clean recommended",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Rose", hex: "#b76e79" },
      { name: "Black", hex: "#0b0b0d" },
    ],
    rating: 4.7,
    reviews: 87,
    inStock: true,
    createdAt: "2026-10-14",
  },
  {
    id: "p08",
    slug: "pearl-knit-cardigan",
    name: "Pearl Knit Cardigan",
    category: "women",
    price: 8499,
    images: ["/images/products/pearl-knit-cardigan-1.svg", "/images/products/pearl-knit-cardigan-2.svg"],
    description:
      "A cloud-soft pearl-grey knit with delicate gold-thread buttons. The layering piece you will reach for in every season.",
    details: [
      "Cotton-rich fine gauge knit",
      "Gold-tone engraved buttons",
      "Relaxed feminine fit",
      "Hand wash, dry flat",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Pearl", hex: "#e8e2d4" },
      { name: "Grey", hex: "#9a9aa2" },
    ],
    rating: 4.6,
    reviews: 64,
    badge: "New",
    inStock: true,
    createdAt: "2026-11-05",
  },
  {
    id: "p09",
    slug: "regal-gold-chronograph",
    name: "Regal Gold Chronograph",
    category: "accessories",
    price: 17999,
    oldPrice: 21999,
    images: ["/images/products/regal-gold-chronograph-1.svg", "/images/products/regal-gold-chronograph-2.svg"],
    description:
      "A gold-tone stainless chronograph with mother-of-pearl dial, sapphire-coated glass and 5ATM water resistance. Time, told beautifully.",
    details: [
      "Gold-tone 316L stainless steel",
      "Japanese quartz chronograph movement",
      "Sapphire-coated crystal, 5ATM",
      "2-year warranty included",
    ],
    colors: [
      { name: "Gold / Black", hex: "#d4af37" },
      { name: "Silver / Black", hex: "#c0c0c8" },
    ],
    rating: 4.9,
    reviews: 258,
    badge: "Bestseller",
    featured: true,
    inStock: true,
    createdAt: "2026-09-05",
  },
  {
    id: "p10",
    slug: "milano-leather-handbag",
    name: "Milano Leather Handbag",
    category: "accessories",
    price: 13999,
    images: ["/images/products/milano-leather-handbag-1.svg", "/images/products/milano-leather-handbag-2.svg"],
    description:
      "Structured top-handle bag in pebbled Italian leather with gold feet, suede lining and a detachable shoulder strap. Everyday errands, elevated.",
    details: [
      "Genuine pebbled Italian leather",
      "Suede interior with gold hardware",
      "Detachable, adjustable strap",
      "Dust bag included",
    ],
    colors: [
      { name: "Tan", hex: "#c68b59" },
      { name: "Black", hex: "#101013" },
    ],
    rating: 4.8,
    reviews: 192,
    featured: true,
    inStock: true,
    createdAt: "2026-10-20",
  },
  {
    id: "p11",
    slug: "onyx-aviator-sunglasses",
    name: "Onyx Aviator Sunglasses",
    category: "accessories",
    price: 3499,
    oldPrice: 4499,
    images: ["/images/products/onyx-aviator-sunglasses-1.svg", "/images/products/onyx-aviator-sunglasses-2.svg"],
    description:
      "Classic aviator frame in onyx with gold bridge detailing and polarised UV400 lenses. Light on the face, heavy on presence.",
    details: [
      "Polarised UV400 protection lenses",
      "Lightweight metal frame, gold accents",
      "Adjustable silicone nose pads",
      "Hard case & cloth included",
    ],
    colors: [{ name: "Onyx / Gold", hex: "#1a1a1e" }],
    rating: 4.7,
    reviews: 121,
    featured: true,
    inStock: true,
    createdAt: "2026-08-11",
  },
  {
    id: "p12",
    slug: "oud-royale-eau-de-parfum",
    name: "Oud Royale Eau de Parfum",
    category: "fragrances",
    price: 7999,
    images: ["/images/products/oud-royale-eau-de-parfum-1.svg", "/images/products/oud-royale-eau-de-parfum-2.svg"],
    description:
      "Smoky Cambodian oud wrapped in saffron, rose and warm amber. A 12-hour signature scent in a hand-polished flacon. Our most gifted fragrance.",
    details: [
      "100ml eau de parfum, 20% concentration",
      "Top: saffron & bergamot · Heart: rose · Base: oud & amber",
      "Longevity: 10–12 hours",
      "Hand-polished glass flacon",
    ],
    rating: 4.9,
    reviews: 301,
    badge: "Bestseller",
    featured: true,
    inStock: true,
    createdAt: "2026-09-22",
  },
  {
    id: "p13",
    slug: "amber-nights-perfume",
    name: "Amber Nights Perfume",
    category: "fragrances",
    price: 5999,
    oldPrice: 7499,
    images: ["/images/products/amber-nights-perfume-1.svg", "/images/products/amber-nights-perfume-2.svg"],
    description:
      "Golden amber, vanilla bourbon and a whisper of tobacco flower. Warm, addictive and made for evenings that stretch past midnight.",
    details: [
      "50ml eau de parfum",
      "Top: bergamot · Heart: amber · Base: vanilla & tobacco",
      "Longevity: 8–10 hours",
      "Unisex profile",
    ],
    rating: 4.7,
    reviews: 145,
    badge: "New",
    inStock: true,
    createdAt: "2026-11-10",
  },
  {
    id: "p14",
    slug: "velvet-musk-attar",
    name: "Velvet Musk Attar",
    category: "fragrances",
    price: 3499,
    images: ["/images/products/velvet-musk-attar-1.svg", "/images/products/velvet-musk-attar-2.svg"],
    description:
      "A pure, alcohol-free roll-on attar of white musk and soft florals. Traditional in spirit, modern in polish — kind to skin and prayer-friendly.",
    details: [
      "12ml concentrated attar, alcohol-free",
      "White musk, jasmine & sandalwood",
      "Roll-on applicator, travel friendly",
      "Skin-safe & halal certified",
    ],
    rating: 4.8,
    reviews: 167,
    badge: "New",
    inStock: true,
    createdAt: "2026-11-14",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "Lahore",
    text: "The Aurelia gown exceeded every expectation — the silk, the fit, the packaging. Cash on delivery made it completely risk-free. I've already ordered twice more.",
    rating: 5,
    initials: "AK",
  },
  {
    name: "Hamza Raza",
    role: "Karachi",
    text: "Bought the Noir suit for my wedding events. The tailoring rivals brands charging triple. Aizaz Collections is now my only stop for formal wear.",
    rating: 5,
    initials: "HR",
  },
  {
    name: "Fatima Siddiqui",
    role: "Islamabad",
    text: "Ordered the Oud Royale on a friend's recommendation. 12 hours later it's still turning heads. Delivery was quick and payment on the doorstep was effortless.",
    rating: 5,
    initials: "FS",
  },
  {
    name: "Bilal Ahmed",
    role: "Faisalabad",
    text: "The chronograph looks far more expensive than it is. Genuine feel, beautiful weight, and their support team answered every question on WhatsApp within minutes.",
    rating: 4.5,
    initials: "BA",
  },
  {
    name: "Zainab Malik",
    role: "Multan",
    text: "From browsing to unboxing, everything feels luxurious. The Golden Hour Maxi fits like it was made for me. Finally a premium store that ships nationwide with COD.",
    rating: 5,
    initials: "ZM",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}
