"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./cart-store";

export interface Order {
  orderNumber: string;
  items: CartItem[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  orderDate: string;
  paymentId?: string;
  status: "processing" | "shipped" | "in_transit" | "delivered";
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  getAllOrders: () => Order[];
  updateOrderStatus: (orderNumber: string, status: Order["status"]) => void;
}

// Generate unique order number
export function generateOrderNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "HZRD-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set({ orders: [...get().orders, order] });
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find(
          (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()
        );
      },

      getAllOrders: () => {
        return get().orders;
      },

      updateOrderStatus: (orderNumber, status) => {
        set({
          orders: get().orders.map((o) =>
            o.orderNumber === orderNumber ? { ...o, status } : o
          ),
        });
      },
    }),
    {
      name: "hzrd-orders",
    }
  )
);
