# ✦ Aizaz Collections

A luxury e-commerce storefront built with **Next.js 15 (App Router) · Tailwind CSS v4 · Framer Motion**.
Deep black & rich gold theme, buttery animations, wishlist, cart, and a **Cash-on-Delivery only** checkout.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## ✨ Features

- Animated home page: parallax hero, featured products, categories, testimonials, CTA
- Shop page: live search, category / price / rating / new-arrival filters, sorting, layout animations
- Product pages: image gallery with hover zoom, sizes & colors, Add to Cart, **Buy Now (COD)**
- Cart with quantity controls, remove animations & free-shipping progress bar
- COD-only checkout with validation + order summary → animated Thank-You page
- Wishlist, recently viewed products, toast notifications
- Floating AI style assistant ("Aiza") — answers FAQs, finds products, recommends items
- Sticky header with search overlay, cart badge, mobile slide-in menu
- SEO: metadata, Open Graph, JSON-LD product schema, `sitemap.xml`, `robots.txt`
- Loading skeletons & page transitions everywhere

## 🖼 Replacing the placeholder images

All product images are elegant SVG placeholders living in `public/images/products/`.

To use **your own photos**:

1. Drop your images into `public/images/products/` (e.g. `noir-signature-suit-1.jpg`)
2. Update the `images` arrays in **`src/lib/data.ts`** to point at your filenames — that's it.

> Tip: 4:5 portrait (e.g. 1200×1500) photos look best in the cards and gallery.

## 🎨 Customizing the brand

| What                 | Where                                        |
| -------------------- | -------------------------------------------- |
| Colors (gold, ink…)  | `src/app/globals.css` → `@theme` block       |
| Products / prices    | `src/lib/data.ts`                            |
| Categories           | `src/lib/data.ts`                            |
| Testimonials         | `src/lib/data.ts`                            |
| AI assistant brain   | `src/lib/ai.ts`                              |
| WhatsApp / phone     | search for `923001234567` and replace        |
| Site URL (SEO)       | `src/app/layout.tsx` → `SITE_URL`            |

## 🤖 Making the chat truly AI-powered

`src/lib/ai.ts` currently uses a fast, offline intent + product-search engine (no API key needed).
To upgrade to a real LLM later, replace `getBotReply()` with a call to any LLM API (OpenAI, Gemini, etc.)
passing the product catalog from `src/lib/data.ts` as context — the chat UI already renders product
cards returned by the reply.

## 📦 Production

```bash
npm run build
npm start
```

---

© 2026 Aizaz Collections — Crafted with Next.js, Tailwind & Framer Motion.
# aizaz-collections
