import { ProductType } from "@repo/database";
import api from "@/lib/api-client";

export const getProducts = async (
    query?: string,
    sortBy?: string
): Promise<Omit<ProductType, "categoryId">[]> => {
    return api.get("/products", { params: { query, sortBy } });
};
