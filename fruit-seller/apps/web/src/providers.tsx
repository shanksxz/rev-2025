import { createQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./hooks/use-cart";
import { NuqsAdapter } from 'nuqs/adapters/next/pages'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={createQueryClient()}>
			<CartContextProvider>
				<NuqsAdapter>
					{children}
				</NuqsAdapter>
			</CartContextProvider>
		</QueryClientProvider>
	);
}
