"use client";

import { useQuery } from "@tanstack/react-query";
import getPost from "@/actions/get-post";

export default function Post({ id }: { id: number }) {
    const { data: post } = useQuery({ queryKey: ["post", id], queryFn: () => getPost(id) });
    return <div>{JSON.stringify(post)}</div>;
}