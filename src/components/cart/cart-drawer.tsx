"use client";

import { useState, useEffect } from "react";
import { Drawer } from "vaul";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, openCart, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = getTotalPrice();
  const totalItems = mounted ? getTotalItems() : 0;

  const handleRemove = (id: number, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => {
        if (open) {
          (document.activeElement as HTMLElement)?.blur();
          openCart();
        } else {
          closeCart();
        }
      }}>
      <Drawer.Trigger asChild>
        <button className="relative group" onClick={openCart}>
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white font-mono">
              {totalItems}
            </span>
          )}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" onClick={closeCart} />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[90vh] mt-24 fixed bottom-0 left-0 right-0 z-50">
          <Drawer.Title className="sr-only">Shopping Bag</Drawer.Title>
          <Drawer.Description className="sr-only">View and manage items in your shopping bag</Drawer.Description>
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-hidden flex flex-col">
            {/* Handle */}
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />

            {/* Header */}
            <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-4">
              <h1 className="font-heading text-4xl uppercase tracking-tighter">Shopping Bag</h1>
              <span className="font-mono text-xs text-gray-400 mb-1">({totalItems} ITEMS)</span>
            </div>

            {/* Cart Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                <p className="font-heading text-2xl uppercase text-gray-400">Your bag is empty</p>
                <p className="text-sm text-gray-400 mt-2">Add some items to get started</p>
                <Button 
                  onClick={closeCart}
                  className="mt-6 bg-black text-white hover:bg-gray-900"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 overflow-y-auto flex-1 pb-32">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 group">
                    <div className="relative w-24 h-32 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full mix-blend-multiply"
                      />
                    </div>
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-sans font-medium text-sm">{item.name}</h3>
                          <p className="font-mono text-sm">₹{item.price}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 uppercase">
                          Color: {item.color} / Size: {item.size}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 border border-gray-200 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="hover:text-gray-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="hover:text-gray-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="text-xs text-gray-400 hover:text-black hover:underline uppercase transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer - Only show if items exist */}
            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white pb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-heading uppercase text-xl">Total</span>
                  <span className="font-mono text-lg">₹{totalPrice.toLocaleString()}</span>
                </div>
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full h-12 bg-black text-white hover:bg-gray-900 rounded-none uppercase tracking-widest font-heading text-lg">
                    Checkout
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
