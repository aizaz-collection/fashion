/**
 * Generates elegant SVG placeholder images for Aizaz Collections.
 * Run: node scripts/generate-placeholders.mjs
 * Replace these with real product photos any time (see README.md).
 */
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = (p) => join(root, "public", p);

const products = [
  ["noir-signature-suit", "Noir Signature Suit", "MEN"],
  ["midnight-leather-jacket", "Midnight Leather Jacket", "MEN"],
  ["ivory-cashmere-sweater", "Ivory Cashmere Sweater", "MEN"],
  ["onyx-formal-shirt", "Onyx Formal Shirt", "MEN"],
  ["aurelia-silk-gown", "Aurelia Silk Gown", "WOMEN"],
  ["golden-hour-maxi", "Golden Hour Maxi", "WOMEN"],
  ["velvet-rose-dress", "Velvet Rose Dress", "WOMEN"],
  ["pearl-knit-cardigan", "Pearl Knit Cardigan", "WOMEN"],
  ["regal-gold-chronograph", "Regal Gold Chronograph", "ACCESSORIES"],
  ["milano-leather-handbag", "Milano Leather Handbag", "ACCESSORIES"],
  ["onyx-aviator-sunglasses", "Onyx Aviator Sunglasses", "ACCESSORIES"],
  ["oud-royale-eau-de-parfum", "Oud Royale", "FRAGRANCES"],
  ["amber-nights-perfume", "Amber Nights", "FRAGRANCES"],
  ["velvet-musk-attar", "Velvet Musk Attar", "FRAGRANCES"],
];

const variantLabels = ["Main View", "Detail Angle"];

function productSvg(title, sub, variant) {
  const glowCx = variant === 0 ? "50%" : "38%";
  const glowCy = variant === 0 ? "42%" : "55%";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17171b"/><stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="${glowCx}" cy="${glowCy}" r="62%">
      <stop offset="0" stop-color="#d4af37" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8f6b1a"/><stop offset="0.5" stop-color="#e9ce7a"/><stop offset="1" stop-color="#8f6b1a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1500" fill="url(#bg)"/>
  <rect width="1200" height="1500" fill="url(#glow)"/>
  <rect x="40" y="40" width="1120" height="1420" fill="none" stroke="#d4af37" stroke-opacity="0.45" stroke-width="2"/>
  <rect x="58" y="58" width="1084" height="1384" fill="none" stroke="#d4af37" stroke-opacity="0.16" stroke-width="1"/>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#d4af37" letter-spacing="18">AIZAZ</text>
  <text x="600" y="700" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${title.length > 20 ? 58 : 68}" fill="#f4efe4" letter-spacing="4">${title}</text>
  <rect x="450" y="760" width="300" height="2" fill="url(#gold)"/>
  <path d="M600 738 l12 12 -12 12 -12 -12 z" fill="#d4af37"/>
  <text x="600" y="830" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#a39f96" letter-spacing="16">${sub}</text>
  <text x="600" y="1000" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="22" fill="#d4af37" fill-opacity="0.75" letter-spacing="6">${variantLabels[variant] ?? "Collection"}</text>
  <text x="600" y="1400" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" fill="#a39f96" fill-opacity="0.5" letter-spacing="10">COLLECTIONS · COD AVAILABLE</text>
</svg>`;
}

function categorySvg(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#18181c"/><stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="60%">
      <stop offset="0" stop-color="#d4af37" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8f6b1a"/><stop offset="0.5" stop-color="#e9ce7a"/><stop offset="1" stop-color="#8f6b1a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1500" fill="url(#bg)"/>
  <rect width="1200" height="1500" fill="url(#glow)"/>
  <rect x="40" y="40" width="1120" height="1420" fill="none" stroke="#d4af37" stroke-opacity="0.45" stroke-width="2"/>
  <path d="M600 300 l18 18 -18 18 -18 -18 z" fill="#d4af37"/>
  <text x="600" y="760" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="88" fill="#f4efe4" letter-spacing="8">${name}</text>
  <rect x="420" y="820" width="360" height="2" fill="url(#gold)"/>
  <text x="600" y="880" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#d4af37" letter-spacing="14">THE COLLECTION</text>
</svg>`;
}

function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17171b"/><stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="65%">
      <stop offset="0" stop-color="#d4af37" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="#d4af37" stroke-opacity="0.45" stroke-width="2"/>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="92" fill="#e9ce7a" letter-spacing="10">AIZAZ</text>
  <text x="600" y="310" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#f4efe4" letter-spacing="26">COLLECTIONS</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#a39f96">Luxury Fashion · Accessories · Fragrances</text>
  <text x="600" y="520" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#d4af37" letter-spacing="8">✦ CASH ON DELIVERY NATIONWIDE ✦</text>
</svg>`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e9ce7a"/><stop offset="1" stop-color="#9c7c1e"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0a0a0c"/>
  <rect x="3" y="3" width="58" height="58" rx="12" fill="none" stroke="url(#g)" stroke-width="2.5"/>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="36" font-weight="bold" fill="#e9ce7a">A</text>
</svg>`;
}

mkdirSync(out("images/products"), { recursive: true });
mkdirSync(out("images/categories"), { recursive: true });

for (const [slug, title, sub] of products) {
  writeFileSync(out(`images/products/${slug}-1.svg`), productSvg(title, sub, 0));
  writeFileSync(out(`images/products/${slug}-2.svg`), productSvg(title, sub, 1));
}
for (const cat of ["men", "women", "accessories", "fragrances"]) {
  writeFileSync(out(`images/categories/${cat}.svg`), categorySvg(cat[0].toUpperCase() + cat.slice(1)));
}
writeFileSync(out("og.svg"), ogSvg());
writeFileSync(out("favicon.svg"), faviconSvg());

console.log(`✓ Generated ${products.length * 2} product images, 4 category images, og.svg, favicon.svg`);
