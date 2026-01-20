"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Plus, Heart, Eye } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { toast } from "sonner";
import Link from "next/link";
import { PRODUCTS, Product } from "@/lib/product-data";
import { QuickViewModal } from "@/components/product/quick-view-modal";

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0],
      size: product.sizes[0],
    });
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${product.sizes[0]} / Color: ${product.colors[0]}`,
    });
  };

  const handleWishlistToggle = (product: typeof PRODUCTS[0]) => {
    const wasInWishlist = isInWishlist(product.id);
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    if (wasInWishlist) {
      toast.success(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist`);
    }
  };

  // Get featured products for carousel
  const carouselProducts = PRODUCTS.filter((p) => p.featured || p.category === "t-shirts").slice(0, 8);

  return (
    <section className="py-20 md:py-28 border-b border-gray-100 bg-white">
      {/* Header with Navigation */}
      <div className="container mx-auto px-4 md:px-8 mb-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
              The Archive
            </span>
            <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter">
              Latest Arrivals
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6">
          {carouselProducts.map((product) => {
            const inWishlist = mounted && isInWishlist(product.id);
            return (
              <div key={product.id} className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0 pl-4 md:pl-6">
                <div className="group relative">
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden mb-4 cursor-pointer">
                      <div className="absolute inset-0 bg-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply p-8 md:p-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </Link>
                  
                    {/* Hover Actions */}
                    <div className="absolute bottom-20 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-2 group-hover:translate-y-0">
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAdd(product);
                        }}
                        className="bg-white px-4 py-2.5 text-xs font-mono uppercase hover:bg-black hover:text-white flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Quick Add
                      </button>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        {/* Quick View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white shadow-sm transition-all"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWishlistToggle(product);
                          }}
                          className={`w-9 h-9 flex items-center justify-center border shadow-sm transition-all ${
                            inWishlist
                              ? "bg-black border-black text-white"
                              : "bg-white border-gray-200 hover:border-black"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>

                  {/* Product Info */}
                  <Link href={`/product/${product.id}`}>
                    <div className="flex justify-between items-start cursor-pointer">
                      <h3 className="font-sans text-sm font-medium uppercase group-hover:underline decoration-1 underline-offset-4 leading-tight max-w-[70%]">
                        {product.name}
                      </h3>
                      <span className="font-mono text-sm">₹{product.price.toLocaleString()}</span>
                    </div>
                  </Link>
                  
                  {/* Category Tag */}
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wide mt-1 block">
                    {product.category.replace("-", " ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Link */}
      <div className="container mx-auto px-4 md:px-8 mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:underline underline-offset-4"
        >
          View All Products
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}

