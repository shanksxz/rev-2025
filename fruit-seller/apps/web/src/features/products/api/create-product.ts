import api from "@/lib/api-client";
import { ProductType } from "@repo/database";

export const createProduct = async (product: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>) => {
    return api.post("/products", product);
};