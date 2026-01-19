import { PRODUCTS } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Shop All | HZRD",
  description: "Browse the complete HZRD collection. Limited edition streetwear made for the bold.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                The Archive
              </span>
              <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Shop All
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex items-end">
              <p className="font-sans text-sm text-gray-500 max-w-sm">
                Limited edition pieces. Each item is crafted with intention, designed for those who define their own rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Category Navigation */}
          <div className="mb-12 pb-6 border-b border-gray-100">
            <CategoryNav activeCategory="all" />
          </div>

          {/* Product Grid */}
          <ProductGrid products={PRODUCTS} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
