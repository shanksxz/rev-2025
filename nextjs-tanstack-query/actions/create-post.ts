import { api } from "@/lib/api-client";
import { Post } from "@/actions/util";

export default async function createPost(post: Omit<Post, "id">): Promise<Post> {
    return api.post("/posts", post);
}
