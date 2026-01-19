"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  
  // Actions
  addItem: (item: Omit<WishlistItem, "addedAt">) => void;
  removeItem: (id: number) => void;
  toggleItem: (item: Omit<WishlistItem, "addedAt">) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
  
  // Computed
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (!exists) {
          set((state) => ({
            items: [...state.items, { ...item, addedAt: Date.now() }],
          }));
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      toggleItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: "hzrd-wishlist",
    }
  )
);
