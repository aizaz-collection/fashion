import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductBySlug, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
