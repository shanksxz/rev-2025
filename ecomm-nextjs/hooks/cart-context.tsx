"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Cart, CartItem } from "@/types/product"

interface CartContextType extends Cart {
  totalItems: number;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  tax: number;
  shipping: number;
}

const SHIPPING_COST = 15.99;
const TAX_RATE = 0.08;

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("cart");
      if (stored) setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.productId === item.productId);
      if (existingItem) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: Math.min(i.quantity + 1, i.maxQuantity) }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const removeItem = useCallback((item: CartItem) => {
    setItems((prev) => prev.filter((i) => i.productId !== item.productId));
  }, []);

  const updateQuantity = useCallback((item: CartItem, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: Math.min(quantity, i.maxQuantity) }
          : i
      )
    );
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        removeItem,
        addItem,
        clearCart,
        updateQuantity,
        total,
        subtotal,
        tax,
        shipping: SHIPPING_COST
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) throw new Error("Cannot use useCart outside CartContextProvider");
  return ctx;
}
