"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface StickyAddToCartProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  onAddToCart: () => void;
}

export function StickyAddToCart({
  product,
  selectedColor,
  selectedSize,
  onAddToCart,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Look for the main add to cart button
    const mainButton = document.getElementById("main-add-to-cart");
    if (!mainButton) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when main button is NOT visible
        setHasIntersected(true);
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-80px 0px 0px 0px", // Account for navbar
        threshold: 0,
      }
    );

    observerRef.current.observe(mainButton);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Don't render on desktop
  return (
    <>
      <AnimatePresence>
        {isVisible && hasIntersected && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-lg md:hidden"
          >
            <div className="flex items-center gap-3">
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm uppercase tracking-tight truncate">
                  {product.name}
                </p>
                <p className="font-mono text-xs text-gray-500">
                  {selectedColor} / {selectedSize} — ₹{product.price.toLocaleString()}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={onAddToCart}
                className="flex items-center gap-2 bg-black text-white px-5 py-3 font-heading uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
