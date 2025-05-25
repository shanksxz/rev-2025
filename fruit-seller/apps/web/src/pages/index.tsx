import { useRouter } from "next/router";
import { useEffect } from "react";

//? this page is only for redirecting to the products page
export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/products');
	}, [router]);

	return null;
}
