import type { Metadata } from "next";
import { Suspense } from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import ShopSkeleton from "@/components/shop/ShopSkeleton";

export const metadata: Metadata = {
  title: "Shop the Collection",
  description:
    "Explore premium fashion, accessories and fragrances at Aizaz Collections. Filter the full collection and enjoy cash on delivery nationwide.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopCatalog />
    </Suspense>
  );
}
