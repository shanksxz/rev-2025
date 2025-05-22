import api from "@/lib/api-client";
import { ProductType } from "@repo/database";

export const getProduct = async (id: string): Promise<ProductType> => {
    return api.get(`/products/${id}`);
};

