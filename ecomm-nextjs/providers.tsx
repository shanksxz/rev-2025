"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "./lib/query-client";
import CartContextProvider from "./hooks/cart-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </QueryClientProvider>
  )
}
