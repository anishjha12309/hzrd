import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "T-Shirts | Premium Oversized Tees",
  description:
    "Shop premium oversized t-shirts. 200-240 GSM heavyweight cotton, screen printed graphics, relaxed fits. Limited edition drops from HZRD.",
  keywords: [
    "oversized t-shirts",
    "premium t-shirts India",
    "heavyweight cotton tees",
    "graphic tees",
    "streetwear t-shirts",
  ],
  openGraph: {
    title: "T-Shirts | HZRD",
    description: "Premium oversized t-shirts. Heavyweight cotton, limited edition.",
  },
  alternates: {
    canonical: "https://hzrd.store/shop/t-shirts",
  },
};

export default function TShirtsPage() {
  const products = getProductsByCategory("t-shirts");

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            T-Shirts
          </h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
            {products.length} Products
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryNav activeCategory="t-shirts" />
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
