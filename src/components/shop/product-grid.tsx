"use client";

import { useState, useEffect } from "react";
import { Plus, Heart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { toast } from "sonner";
import { QuickViewModal } from "@/components/product/quick-view-modal";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0],
      size: product.sizes[Math.floor(product.sizes.length / 2)],
    });
    toast.success(`${product.name} added to cart`, {
      description: `Color: ${product.colors[0]}`,
    });
  };

  const handleWishlistToggle = (product: Product) => {
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

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-mono text-sm uppercase text-gray-400">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const inWishlist = mounted && isInWishlist(product.id);
          return (
            <div key={product.id} className="group relative">
              <Link href={`/product/${product.id}`}>
              <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden mb-4 border border-gray-100">
                <div className="absolute inset-0 bg-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {product.featured && (
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-mono text-xs uppercase z-20">
                    Featured
                  </span>
                )}

                {/* Wishlist Button - Top Right */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlistToggle(product);
                  }}
                  className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all z-20 ${
                    inWishlist
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-black hover:bg-black hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                </button>

                {/* Quick View Button - Bottom Right */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white opacity-0 group-hover:opacity-100 transition-all z-20"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </Link>
            
            {/* Quick Add Button - Bottom Left (outside image, on hover) */}
            <div className="absolute bottom-20 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={() => handleQuickAdd(product)}
                className="bg-white px-4 py-2 text-xs font-mono uppercase hover:bg-black hover:text-white flex items-center gap-2 border border-transparent hover:border-black transition-colors"
              >
                <Plus className="w-3 h-3" />
                Quick Add
              </button>
            </div>

              <Link href={`/product/${product.id}`}>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-sans text-sm font-medium uppercase group-hover:underline decoration-1 underline-offset-4 leading-tight">
                    {product.name}
                  </h3>
                  <span className="font-mono text-sm text-gray-500 whitespace-nowrap">₹{product.price.toLocaleString()}</span>
                </div>
              </Link>
              <div className="flex gap-1 mt-2">
                {product.colors.slice(0, 3).map((color) => (
                  <span key={color} className="text-xs font-mono text-gray-400">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}

