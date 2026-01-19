"use client";

import { useState, useEffect } from "react";
import { Drawer } from "vaul";
import { Heart, X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { getProductById } from "@/lib/product-data";

export function WishlistDrawer() {
  const { items, removeItem, clearWishlist, getTotalItems } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (item: typeof items[0]) => {
    const product = getProductById(item.id);
    if (product) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: product.colors[0],
        size: product.sizes[Math.floor(product.sizes.length / 2)],
      });
      removeItem(item.id);
      toast.success(`${item.name} moved to cart`);
    }
  };

  const itemCount = mounted ? getTotalItems() : 0;

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="right">
      <Drawer.Trigger asChild>
        <button className="relative p-2 hover:bg-gray-100 transition-colors">
          <Heart className="w-5 h-5" />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-mono flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Drawer.Content className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white outline-none flex flex-col">
          <Drawer.Title className="sr-only">Wishlist</Drawer.Title>
          <Drawer.Description className="sr-only">Your saved items</Drawer.Description>

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              <span className="font-heading text-xl uppercase tracking-tight">
                Wishlist ({itemCount})
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                <Heart className="w-12 h-12 text-gray-200 mb-4" />
                <p className="font-heading text-xl uppercase text-gray-400 mb-2">
                  No Saved Items
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Items you save will appear here
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-black text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4 group">
                    <Link
                      href={`/product/${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="w-24 h-28 bg-[#F5F5F5] flex-shrink-0 relative overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover mix-blend-multiply p-2"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <h3 className="font-sans text-sm font-medium uppercase leading-tight truncate hover:underline">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="font-mono text-xs text-gray-400 uppercase">
                        {item.category.replace("-", " ")}
                      </span>
                      <p className="font-mono text-sm mt-1">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-black text-white text-[10px] font-mono uppercase hover:bg-gray-800 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 space-y-3">
              <button
                onClick={() => {
                  items.forEach((item) => handleMoveToCart(item));
                  toast.success("All items moved to cart");
                }}
                className="w-full py-3 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add All to Cart
              </button>
              <button
                onClick={() => {
                  clearWishlist();
                  toast.success("Wishlist cleared");
                }}
                className="w-full py-3 border border-gray-200 font-mono text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors text-gray-500"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
