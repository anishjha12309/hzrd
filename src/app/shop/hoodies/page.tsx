import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Hoodies | Premium Heavyweight Fleece",
  description:
    "Shop premium hoodies at HZRD. 380-400 GSM heavyweight fleece, brushed interior, oversized fits. Essential streetwear pieces.",
  keywords: [
    "premium hoodies",
    "heavyweight fleece hoodies",
    "oversized hoodies India",
    "streetwear hoodies",
    "zip hoodies",
  ],
  openGraph: {
    title: "Hoodies | HZRD",
    description: "Premium heavyweight fleece hoodies. Oversized fits.",
  },
  alternates: {
    canonical: "https://hzrd.store/shop/hoodies",
  },
};

export default function HoodiesPage() {
  const products = getProductsByCategory("hoodies");

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Hoodies
          </h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
            {products.length} Products
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryNav activeCategory="hoodies" />
      </div>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <ProductGrid products={products} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
