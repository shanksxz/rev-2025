import { api } from "@/lib/api-client";
import { Product } from "@/types/product";

export function getProducts(): Promise<Product[]> {
    return api.get("/products");
}
