import { api } from "@/lib/api-client";
import { Product } from "@/types/product";

export function getProduct(id: string): Promise<Product> {
    return api.get(`/products/${id}`);
}
 