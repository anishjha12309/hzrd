"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Drawer } from "vaul";
import { Search, X, ArrowRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchProducts, initSearchDb } from "@/lib/search";
import { Product, PRODUCTS } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import Link from "next/link";

export function SearchDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const { setOpenSearchHandler } = useKeyboardShortcuts();

  // Register with keyboard shortcuts
  useEffect(() => {
    setOpenSearchHandler(() => setIsOpen(true));
  }, [setOpenSearchHandler]);

  // Initialize search db on mount
  useEffect(() => {
    initSearchDb();
    // Load recent searches from localStorage
    const saved = localStorage.getItem("hzrd-recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    // Reset selection when drawer opens/closes
    setSelectedIndex(-1);
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        const searchResults = await searchProducts(query);
        setResults(searchResults);
        setIsSearching(false);
        setSelectedIndex(-1); // Reset selection on new results
      } else {
        setResults([]);
        setSelectedIndex(-1);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard navigation in search results
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const product = results[selectedIndex];
      window.location.href = `/product/${product.id}`;
      setIsOpen(false);
    }
  }, [results, selectedIndex]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    // Save to recent searches
    if (searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("hzrd-recent-searches", JSON.stringify(updated));
    }
  }, [recentSearches]);

  const handleQuickAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0] || "Black",
      size: product.sizes?.[0] || "M",
    });
    toast.success(`${product.name} added to cart`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("hzrd-recent-searches");
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => {
        if (open) {
          (document.activeElement as HTMLElement)?.blur();
        }
        setIsOpen(open);
      }} direction="top">
      <Drawer.Trigger asChild>
        <button className="hidden md:flex items-center gap-2 group">
          <span className="font-mono text-xs uppercase tracking-widest group-hover:underline">
            Search
          </span>
          <Search className="w-4 h-4" />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Drawer.Content className="fixed top-0 left-0 right-0 z-50 bg-white outline-none">
          <Drawer.Title className="sr-only">Search Products</Drawer.Title>
          <Drawer.Description className="sr-only">Search for products, categories, and more</Drawer.Description>
          
          <div className="max-h-[90vh] overflow-y-auto">
            {/* Search Header */}
            <div className="border-b border-gray-100 p-6">
              <div className="container mx-auto">
                <div className="flex items-center gap-4">
                  <Search className="w-6 h-6 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products, categories..."
                    className="flex-1 text-2xl md:text-4xl font-heading uppercase tracking-tight outline-none placeholder:text-gray-300 bg-transparent"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Content */}
            <div className="container mx-auto p-6">
              <AnimatePresence mode="wait">
                {/* Results */}
                {query.trim() && results.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-xs text-gray-400 uppercase">
                        {results.length} Results for "{query}"
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {results.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="group cursor-pointer"
                        >
                          <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover mix-blend-multiply p-8 group-hover:scale-105 transition-transform duration-500"
                            />
                            <button
                              onClick={() => handleQuickAdd(product)}
                              className="absolute bottom-3 left-3 bg-black text-white px-3 py-2 text-xs font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
                            >
                              <Plus className="w-3 h-3" />
                              Add
                            </button>
                          </div>
                          <h3 className="font-sans text-sm font-medium uppercase group-hover:underline">
                            {product.name}
                          </h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                            <span className="font-mono text-sm">₹{product.price}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* No Results */}
                {query.trim() && results.length === 0 && !isSearching && (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <p className="font-heading text-3xl uppercase text-gray-300">No Results Found</p>
                    <p className="text-sm text-gray-400 mt-2">Try searching for something else</p>
                  </motion.div>
                )}

                {/* Default: Recent + Popular */}
                {!query.trim() && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-12"
                  >
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-mono text-xs uppercase text-gray-400">Recent Searches</h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-gray-400 hover:text-black hover:underline"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-2">
                          {recentSearches.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => handleSearch(term)}
                              className="flex items-center justify-between w-full py-2 border-b border-gray-100 hover:border-black transition-colors group"
                            >
                              <span className="font-heading text-lg uppercase">{term}</span>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Categories */}
                    <div>
                      <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Popular Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {["T-Shirts", "Hoodies", "Pants", "Accessories", "Sweatshirts"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleSearch(cat)}
                            className="px-4 py-2 border border-gray-200 font-mono text-xs uppercase hover:bg-black hover:text-white hover:border-black transition-all"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Featured Products */}
                    <div className="md:col-span-2">
                      <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Featured</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {PRODUCTS.slice(0, 4).map((product) => (
                          <div key={product.id} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-50 overflow-hidden mb-2">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover mix-blend-multiply p-4 group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <p className="text-xs font-medium uppercase truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">₹{product.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
