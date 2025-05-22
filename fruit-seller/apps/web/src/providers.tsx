import { createQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./hooks/use-cart";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={createQueryClient()}>
			<CartContextProvider>
				{children}
			</CartContextProvider>
		</QueryClientProvider>
	);
}
