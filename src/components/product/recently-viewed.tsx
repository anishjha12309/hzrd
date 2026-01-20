"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { getProductById } from "@/lib/product-data";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { Product } from "@/lib/product-data";

export function RecentlyViewed() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [mounted, setMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const items = useRecentlyViewedStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Don't render if no items or not mounted
  if (!mounted || items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 border-t border-gray-100 bg-[#FAFAFA]">
      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
              Your History
            </span>
            <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-tighter">
              Recently Viewed
            </h2>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={scrollPrev}
              className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6 container mx-auto px-4 md:px-8">
          {items.map((item) => {
            const fullProduct = getProductById(item.id);
            return (
              <div
                key={item.id}
                className="flex-[0_0_60%] sm:flex-[0_0_40%] md:flex-[0_0_28%] lg:flex-[0_0_22%] min-w-0 pl-4 md:pl-6"
              >
                <div className="group relative">
                  {/* Product Image */}
                  <Link href={`/product/${item.id}`}>
                    <div className="aspect-[4/5] bg-white relative overflow-hidden mb-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 60vw, (max-width: 768px) 40vw, (max-width: 1024px) 28vw, 22vw"
                        className="object-cover mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Quick View Button */}
                  {fullProduct && (
                    <button
                      onClick={() => setQuickViewProduct(fullProduct)}
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white hover:border-black"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {/* Product Info */}
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-sans text-sm font-medium uppercase group-hover:underline decoration-1 underline-offset-4 leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-mono text-sm text-gray-500 mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
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
