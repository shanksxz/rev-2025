import getPost from "@/actions/get-post";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Post from "./_client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["post", id],
        queryFn: () => getPost(Number(id)),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Post id={Number(id)} />
        </HydrationBoundary>
    );
}