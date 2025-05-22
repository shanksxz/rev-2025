import api from "@/lib/api-client";
import { ProductType } from "@repo/database";

export const editProduct = async (product: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>, productId: string) => {
    return api.put(`/products/${productId}`, product);
}; 