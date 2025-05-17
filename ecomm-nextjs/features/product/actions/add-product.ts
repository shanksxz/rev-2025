import { api } from "@/lib/api-client";
import { CreateProductInput } from "@/types/product";

export async function addProduct(input: CreateProductInput) {
    return api.post("/products", input);
}