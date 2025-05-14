import { api } from "@/lib/api-client";
import { Post } from "@/actions/util";

export default async function getPosts(): Promise<Post[]> {
  await new Promise((res) => setTimeout(res, 4000));
  return api.get("/posts");
}
