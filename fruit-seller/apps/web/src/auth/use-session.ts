import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "@/types";

export async function getSession(): Promise<Session> {
    return api.get("/auth/session");
}

export default function useSession() {
    const {
        data: session,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["session"],
        queryFn: getSession,
    });
    return {
        session,
        isLoading,
        error,
    };
}
