"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RecentlyViewedItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  viewedAt: number;
}

interface RecentlyViewedStore {
  items: RecentlyViewedItem[];
  
  // Actions
  addProduct: (product: Omit<RecentlyViewedItem, "viewedAt">) => void;
  clearAll: () => void;
  
  // Computed
  getRecentlyViewed: (limit?: number) => RecentlyViewedItem[];
}

const MAX_ITEMS = 10;

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product) => {
        set((state) => {
          // Remove if already exists
          const filteredItems = state.items.filter((item) => item.id !== product.id);
          
          // Add new item at the beginning
          const newItem: RecentlyViewedItem = {
            ...product,
            viewedAt: Date.now(),
          };
          
          // Keep only MAX_ITEMS
          const newItems = [newItem, ...filteredItems].slice(0, MAX_ITEMS);
          
          return { items: newItems };
        });
      },

      clearAll: () => {
        set({ items: [] });
      },

      getRecentlyViewed: (limit = MAX_ITEMS) => {
        return get().items.slice(0, limit);
      },
    }),
    {
      name: "hzrd-recently-viewed",
    }
  )
);
