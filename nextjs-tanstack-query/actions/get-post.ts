import { api } from "@/lib/api-client";
import { Post } from "@/actions/util";

export default async function getPost(id: number): Promise<Post> {
    return api.get(`/posts/${id}`);
}
