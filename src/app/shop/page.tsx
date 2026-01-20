"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, Product } from "@/lib/product-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { ProductFilters, FilterState } from "@/components/shop/product-filters";
import { ProductSort, SortOption } from "@/components/shop/product-sort";
import { Footer } from "@/components/layout/footer";

// Extract unique values for filters
function getAvailableColors(products: Product[]): string[] {
  const colors = new Set<string>();
  products.forEach((p) => p.colors.forEach((c) => colors.add(c)));
  return Array.from(colors).sort();
}

function getAvailableSizes(products: Product[]): string[] {
  const sizes = new Set<string>();
  products.forEach((p) => p.sizes.forEach((s) => sizes.add(s)));
  // Sort sizes logically (S, M, L, XL, XXL, then numeric)
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  return Array.from(sizes).sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a);
    const bIndex = sizeOrder.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    // Try numeric sort for sizes like "28", "30", etc.
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    return a.localeCompare(b);
  });
}

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 99999 },
  });
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  // Get all products and calculate available filter options
  const allProducts = PRODUCTS;
  const availableColors = useMemo(() => getAvailableColors(allProducts), [allProducts]);
  const availableSizes = useMemo(() => getAvailableSizes(allProducts), [allProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Color filter
      if (filters.colors.length > 0) {
        const hasMatchingColor = product.colors.some((c) => filters.colors.includes(c));
        if (!hasMatchingColor) return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const hasMatchingSize = product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Price filter
      if (filters.priceRange.min > 0 || filters.priceRange.max < 99999) {
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
          return false;
        }
      }

      return true;
    });
  }, [allProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return sorted.sort((a, b) => b.id - a.id);
      case "featured":
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortOption]);

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
            {sortedProducts.length} Products
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryNav activeCategory="all" />
      </div>

      {/* Products Section with Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter/Sort Controls - Mobile */}
          <div className="flex items-center justify-between gap-4 mb-6 lg:hidden">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              availableColors={availableColors}
              availableSizes={availableSizes}
              productCount={sortedProducts.length}
            />
            <ProductSort value={sortOption} onChange={setSortOption} />
          </div>

          {/* Desktop Layout: Sidebar + Grid */}
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                availableColors={availableColors}
                availableSizes={availableSizes}
                productCount={sortedProducts.length}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="hidden lg:flex justify-end mb-6">
                <ProductSort value={sortOption} onChange={setSortOption} />
              </div>

              <ProductGrid products={sortedProducts} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
