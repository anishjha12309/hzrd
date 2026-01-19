import { Metadata } from "next";
import { PRODUCTS } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our complete collection of premium streetwear. T-shirts, hoodies, cargo pants, rings & accessories. Limited edition drops with free shipping above ₹1500.",
  keywords: [
    "buy streetwear online",
    "premium t-shirts India",
    "oversized hoodies",
    "cargo pants online",
    "streetwear accessories",
    "fashion India",
  ],
  openGraph: {
    title: "Shop All | HZRD",
    description: "Browse our complete collection of premium streetwear.",
  },
  alternates: {
    canonical: "https://hzrd.store/shop",
  },
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Shop All
          </h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
            {PRODUCTS.length} Products
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryNav activeCategory="all" />
      </div>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <ProductGrid products={PRODUCTS} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
