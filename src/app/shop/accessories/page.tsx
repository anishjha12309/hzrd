import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Accessories | Rings, Caps & More",
  description:
    "Shop streetwear accessories at HZRD. Brutalist rings, stainless steel jewelry, logo caps. Statement pieces to complete your look.",
  keywords: [
    "streetwear accessories",
    "brutalist rings",
    "stainless steel rings",
    "snapback caps",
    "streetwear jewelry India",
  ],
  openGraph: {
    title: "Accessories | HZRD",
    description: "Brutalist rings, caps & statement pieces.",
  },
  alternates: {
    canonical: "https://hzrd.store/shop/accessories",
  },
};

export default function AccessoriesPage() {
  const products = getProductsByCategory("accessories");

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Accessories
          </h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
            {products.length} Products
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryNav activeCategory="accessories" />
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
