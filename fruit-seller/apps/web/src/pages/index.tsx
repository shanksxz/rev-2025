import useSession from "@/auth/use-session";
import { Button, Box, Typography, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLayout from "@/components/layout/app-layout";
export default function Home() {
	const router = useRouter();
	
	useEffect(() => {
		router.push('/products');
	}, [router]);

	return null;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};
