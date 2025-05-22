import { CategoryType } from "@repo/database";
import api from "@/lib/api-client";

export const getCategories = async (): Promise<CategoryType[]> => {
    return api.get("/categories");
};