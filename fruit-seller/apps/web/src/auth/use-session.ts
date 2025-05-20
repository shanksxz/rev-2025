import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export type Session = {
	id: string;
	userId: string;
	token: string;
	expiresAt: Date;
	user: {
		id: string;
		name: string;
		email: string;
	};
};

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
