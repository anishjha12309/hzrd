"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem);

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

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-mono text-sm uppercase text-gray-400">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <Link href={`/product/${product.id}`}>
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden mb-4 border border-gray-100">
              <div className="absolute inset-0 bg-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply" />
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover mix-blend-multiply p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {product.featured && (
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-mono text-xs uppercase z-20">
                  Featured
                </span>
              )}
            </div>
          </Link>
          
          {/* Quick Add Button */}
          <button
            onClick={() => handleQuickAdd(product)}
            className="absolute bottom-20 left-4 bg-white px-4 py-2 text-xs font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-2 group-hover:translate-y-0 hover:bg-black hover:text-white flex items-center gap-2 border border-transparent hover:border-black"
          >
            <Plus className="w-3 h-3" />
            Quick Add
          </button>

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
      ))}
    </div>
  );
}
