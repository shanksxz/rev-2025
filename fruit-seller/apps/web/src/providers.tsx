import { createQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={createQueryClient()}>
			{children}
		</QueryClientProvider>
	);
}
