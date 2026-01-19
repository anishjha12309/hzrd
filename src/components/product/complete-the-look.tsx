"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Product, getCompleteTheLook } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface CompleteTheLookProps {
  product: Product;
}

export function CompleteTheLook({ product }: CompleteTheLookProps) {
  const lookProducts = getCompleteTheLook(product);
  const addItem = useCartStore((state) => state.addItem);

  if (lookProducts.length === 0) return null;

  const handleQuickAdd = (p: Product) => {
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      color: p.colors[0],
      size: p.sizes[Math.floor(p.sizes.length / 2)],
    });
    toast.success(`${p.name} added to cart`);
  };

  const totalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0) + product.price;
  const discountedPrice = Math.round(totalPrice * 0.9); // 10% bundle discount

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-1">
              Styled With
            </span>
            <h3 className="font-heading text-xl uppercase tracking-tighter">
              Complete the Look
            </h3>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-gray-400 block">Bundle & Save 10%</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-400 line-through">
                ₹{totalPrice.toLocaleString()}
              </span>
              <span className="font-heading text-xl text-green-600">
                ₹{discountedPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {lookProducts.map((p) => (
            <div key={p.id} className="group relative">
              <Link href={`/product/${p.id}`}>
                <div className="aspect-square bg-[#F5F5F5] relative overflow-hidden mb-2">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <button
                onClick={() => handleQuickAdd(p)}
                className="absolute top-2 right-2 w-8 h-8 bg-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white hover:border-black"
              >
                <Plus className="w-4 h-4" />
              </button>
              <Link href={`/product/${p.id}`}>
                <h4 className="font-sans text-xs font-medium uppercase leading-tight truncate group-hover:underline">
                  {p.name}
                </h4>
                <span className="font-mono text-xs text-gray-500">₹{p.price.toLocaleString()}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Add All Button */}
        <button
          onClick={() => {
            lookProducts.forEach((p) => handleQuickAdd(p));
            toast.success("All items added to cart!", {
              description: `${lookProducts.length} items added with 10% bundle discount`,
            });
          }}
          className="w-full mt-6 py-3 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add All to Cart — ₹{discountedPrice.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
