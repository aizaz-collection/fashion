import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aizaz Collections — Luxury Fashion & Lifestyle",
    template: "%s | Aizaz Collections",
  },
  description:
    "Discover Aizaz Collections — premium fashion, accessories & fragrances with nationwide Cash on Delivery. Luxury you can touch, pay only when it arrives.",
  keywords: [
    "Aizaz Collections",
    "luxury fashion Pakistan",
    "cash on delivery",
    "premium clothing",
    "designer accessories",
    "oud perfume",
    "COD shopping",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aizaz Collections",
    title: "Aizaz Collections — Luxury Fashion & Lifestyle",
    description:
      "Premium fashion, accessories & fragrances. 100% Cash on Delivery nationwide.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Aizaz Collections" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aizaz Collections — Luxury Fashion & Lifestyle",
    description:
      "Premium fashion, accessories & fragrances. 100% Cash on Delivery nationwide.",
    images: ["/og.svg"],
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <StoreProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <AIChat />
        </StoreProvider>
      </body>
    </html>
  );
}