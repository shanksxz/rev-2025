import React, { createContext, use, useState } from "react"
import { Cart, CartItem } from "@/types/product"

interface CartContextType extends Cart {
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
}

const SHIPPING_COST = 15.99;
const TAX_RATE = 0.08;

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + SHIPPING_COST + TAX_RATE;

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.productId === item.productId)
      if (existingItem) {
        return prev.map((i) => {
          return i.productId === item.productId ? { ...i, quantity: Math.min(i.quantity + 1, i.maxQuantity) }
            : i
        })
      }
      return [...prev, item]
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const removeItem = (item: CartItem) => {
    setItems((prev) => {
      return prev.filter((i) => i.productId !== item.productId)
    })
  }

  const updateQuantity = (item: CartItem, quantity: number) => {
    setItems((prev) => {
      return prev.map((i) => {
        return i.id === item.id ? { ...i, quantity: Math.min(quantity + 1, i.maxQuantity) } : i;
      })
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        removeItem,
        addItem,
        clearCart,
        updateQuantity,
        total,
        subtotal,
        tax: TAX_RATE,
        shipping: SHIPPING_COST
      }}
    >{children}</CartContext.Provider>
  )
}


export function useCart() {
  const ctx = use(CartContext);
  if (ctx === undefined) throw new Error("Cannot use useCart outside CartContextProvider");
  return ctx;
}
