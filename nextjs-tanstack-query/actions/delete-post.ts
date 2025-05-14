import { api } from "@/lib/api-client";

export default async function deletePost(id: number) {
  return api.delete(`/posts/${id}`);
}

 