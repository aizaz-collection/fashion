import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your Aizaz Collections selection and continue to secure Cash on Delivery checkout.",
};

export default function CartPage() {
  return <CartView />;
}
