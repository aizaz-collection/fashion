/** Format a PKR price, e.g. 12999 -> "Rs 12,999" */
export function formatPrice(amount: number): string {
  return `Rs ${amount.toLocaleString("en-US")}`;
}

/** Free shipping unlocks above this cart subtotal (PKR) */
export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FEE = 199;
