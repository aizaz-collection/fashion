import type { Metadata } from "next";
import OrderSuccess from "@/components/checkout/OrderSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Aizaz Collections Cash on Delivery order has been confirmed.",
};

export default function OrderSuccessPage() {
  return <OrderSuccess />;
}
