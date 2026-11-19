export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  price: number; // PKR
  oldPrice?: number; // original price when on sale
  images: string[]; // /images/products/*.svg|jpg|webp
  description: string;
  details: string[];
  sizes?: string[];
  colors?: ProductColor[];
  rating: number; // 0 - 5
  reviews: number;
  badge?: "New" | "Bestseller" | "Sale";
  featured?: boolean;
  inStock: boolean;
  createdAt: string; // ISO date — used for "newest" sorting & new-arrival filter
};

export type CartItem = {
  key: string; // productId|size|color
  product: Product;
  qty: number;
  size?: string;
  color?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: "Cash on Delivery";
  date: string; // ISO
};

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
};
