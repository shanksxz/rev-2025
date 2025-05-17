import { DefaultOptions, QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const queryConfig: DefaultOptions = {
    queries: {
        refetchOnMount: false,
        retry: false,
        staleTime: 5 * 1000,
    },
    mutations: {
        retry: false,
    },
};

export const createQueryClient = () =>
    new QueryClient({ defaultOptions: queryConfig });

const getServerClient = cache(createQueryClient);

let clientQueryClient: QueryClient | undefined = undefined;

export default function getQueryClient() {
    if (typeof window === "undefined") {
        return getServerClient();
    }
    if (!clientQueryClient) {
        clientQueryClient = createQueryClient();
    }
    return clientQueryClient;
}
