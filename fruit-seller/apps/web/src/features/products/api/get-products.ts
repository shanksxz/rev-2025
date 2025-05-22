import { ProductType } from "@repo/database";
import api from "@/lib/api-client";

export const getProducts = async (): Promise<Omit<ProductType, 'categoryId'>[]> => {
    return api.get('/products');
}