import type { Metadata } from "next";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "Your saved Aizaz Collections pieces, ready whenever you are.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
