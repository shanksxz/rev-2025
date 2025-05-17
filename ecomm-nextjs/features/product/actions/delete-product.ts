import { api } from "@/lib/api-client";

export async function deleteProduct(id: string): Promise<void> {
  return api.delete(`/products/${id}`);
} 