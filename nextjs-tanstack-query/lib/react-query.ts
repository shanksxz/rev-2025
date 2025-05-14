import { QueryClient, DefaultOptions } from "@tanstack/react-query";
import { cache } from "react";

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: queryConfig,
  });

const getServerQueryClient = cache(createQueryClient);

let clientQueryClientSingleton: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return getServerQueryClient();
  }
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient();
  }
  return clientQueryClientSingleton;
}
