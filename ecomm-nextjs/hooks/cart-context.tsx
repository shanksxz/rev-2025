"use client"

import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react"
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

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { item: CartItem; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'INITIALIZE'; payload: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  let newState: CartItem[];

  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        newState = state.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: Math.min(item.quantity + 1, item.maxQuantity) }
            : item
        );
      } else {
        newState = [...state, action.payload];
      }
      break;
    case "REMOVE_ITEM":
      newState = state.filter((item) => item.productId !== action.payload.productId);
      break;
    case "UPDATE_QUANTITY":
      newState = state.map((item) =>
        item.productId === action.payload.item.productId
          ? { ...item, quantity: Math.min(action.payload.quantity, item.maxQuantity) }
          : item
      );
      break;
    case "CLEAR_CART":
      newState = [];
      break;
    case "INITIALIZE":
      newState = action.payload;
      break;
    default:
      return state;
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

  // const [items, setItems] = useState<CartItem[]>([]);
  const [state, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("cart");
      // if (stored) setItems(JSON.parse(stored)); 
      if (stored) dispatch({ type: "INITIALIZE", payload: JSON.parse(stored) });
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem("cart", JSON.stringify(state));
  //   }
  // }, [state]);

  // console.log("rerender cart context provider");
  // const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = state.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((item: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }, []);

  const updateQuantity = useCallback((item: CartItem, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { item, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);


  // const addItem = useCallback((item: CartItem) => {
  //   setItems((prev) => {
  //     const existingItem = prev.find((i) => i.productId === item.productId);
  //     if (existingItem) {
  //       return prev.map((i) =>
  //         i.productId === item.productId
  //           ? { ...i, quantity: Math.min(i.quantity + 1, i.maxQuantity) }
  //           : i
  //       );
  //     }
  //     return [...prev, item];
  //   });
  // }, []);

  // const clearCart = useCallback(() => setItems([]), []);

  // const removeItem = useCallback((item: CartItem) => {
  //   setItems((prev) => prev.filter((i) => i.productId !== item.productId));
  // }, []);

  // const updateQuantity = useCallback((item: CartItem, quantity: number) => {
  //   setItems((prev) =>
  //     prev.map((i) =>
  //       i.productId === item.productId
  //         ? { ...i, quantity: Math.min(quantity, i.maxQuantity) }
  //         : i
  //     )
  //   );
  // }, []);

  // const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state,
        totalItems,
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
