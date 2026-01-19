import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Pants | Cargo Pants & Joggers",
  description:
    "Shop utility cargo pants and tech joggers at HZRD. Multi-pocket designs, relaxed fits, industrial hardware. Premium streetwear bottoms.",
  keywords: [
    "cargo pants India",
    "utility pants",
    "tech joggers",
    "streetwear pants",
    "relaxed fit pants",
  ],
  openGraph: {
    title: "Pants | HZRD",
    description: "Utility cargo pants and tech joggers. Industrial design.",
  },
  alternates: {
    canonical: "https://hzrd.store/shop/pants",
  },
};

export default function PantsPage() {
  const products = getProductsByCategory("pants");

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Pants
          </h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
            {products.length} Products
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryNav activeCategory="pants" />
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
