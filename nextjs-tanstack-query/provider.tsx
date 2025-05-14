"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./hooks/use-theme";
import { getQueryClient } from "./lib/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  console.log("inside provider");
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
