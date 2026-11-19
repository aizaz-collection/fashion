import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Aizaz Collections order with secure Cash on Delivery.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
