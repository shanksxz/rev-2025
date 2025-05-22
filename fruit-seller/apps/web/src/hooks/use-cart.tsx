"use client"

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef, useState } from "react"
import { ProductType } from "@repo/database";

export interface Cart {
  id: string;
  userId: string;
}

export interface CartItem {
  id?: string;
  cartId?: string;
  product: Omit<ProductType, "categoryId">; 
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number, stock: number) => void;
  clearCart: () => void;
  tax: number;
  shipping: number;
  total: number;
  subtotal: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number, stock: number } }
  | { type: 'CLEAR_CART' }
  | { type: "MERGE_CART"; payload: CartItem[] }
  | { type: 'INITIALIZE'; payload: CartItem[] };

// function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
//   let newState: CartItem[];

//   switch (action.type) {
//     case "ADD_ITEM":
//       const existingItem = state.find((item) => item.product.id === action.payload.product.id);
//       if (existingItem) {
//         newState = state.map((item) =>
//           item.product.id === action.payload.product.id
//             ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) }
//             : item
//         );
//       } else {
//         newState = [...state, action.payload];
//       }
//       break;
//     case "REMOVE_ITEM":
//       newState = state.filter((item) => item.product.id !== action.payload.product.id);
//       break;
//     case "UPDATE_QUANTITY":
//       newState = state.map((item) =>
//         item.product.id === action.payload.item.product.id
//           ? { ...item, quantity: Math.min(action.payload.quantity, item.product.stock) }
//           : item
//       );
//       break;
//     case "CLEAR_CART":
//       newState = [];
//       break;
//     case "INITIALIZE":
//       newState = action.payload;
//       break;
//     default:
//       return state;
//   }

//   if (typeof window !== 'undefined') {
//     localStorage.setItem("cart", JSON.stringify(newState));
//   }

//   return newState;
// }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  let newState: CartItem[] = [];
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.product.id === action.payload.product.id);
      if (existingItem) {
        newState = state.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, action.payload.product.stock) }
            : item
        );
      } else {
        newState = [...state, action.payload];
      }
      break;
    case "REMOVE_ITEM":
      newState = state.filter((item) => item.product.id !== action.payload.product.id);
      break;
    case "UPDATE_QUANTITY":
      newState = state.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: Math.min(action.payload.quantity, action.payload.stock) }
          : item
      );
      break;
    case "MERGE_CART":
      newState = [...state, ...action.payload];
      break;
    case "CLEAR_CART":
      newState = [];
      break;
    case "INITIALIZE":
      newState = action.payload;
      break;
    default:
      newState = state;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem("cart", JSON.stringify(newState));
  }

  return newState;
}

const SHIPPING_COST = 15.99;
const TAX_RATE = 0.08;

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("cart");
      if (stored) dispatch({ type: "INITIALIZE", payload: JSON.parse(stored) });
    }
  }, []);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((item: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, stock: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity, stock } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);
  const tax = state.reduce((sum, item) => sum + (item.product.price * TAX_RATE), 0);
  const shipping = SHIPPING_COST;
  const total = state.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) + tax + shipping;
  const subtotal = state.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items: state,
      totalItems,
      removeItem,
      addItem,
      updateQuantity,
      clearCart,
      tax,
      shipping,
      total,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) throw new Error("Cannot use useCart outside CartContextProvider");
  return ctx;
}