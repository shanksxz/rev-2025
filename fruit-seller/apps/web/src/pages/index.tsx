import useSession from "@/auth/use-session";
import { Button, Box, Typography, Container } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
	const { session } = useSession();
	const router = useRouter();
	
	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4, textAlign: 'center' }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Fruit Seller E-commerce
				</Typography>
				
				<Box sx={{ mt: 4 }}>
					<Button 
						variant="contained" 
						color="primary"
						onClick={() => router.push('/dashboard')}
						sx={{ mr: 2 }}
					>
						Go to Dashboard
					</Button>
					
					<Button 
						variant="outlined" 
						onClick={() => router.push('/about')}
					>
						About Us
					</Button>
				</Box>
				
				{session && (
					<Box sx={{ mt: 4 }}>
						<Typography variant="subtitle1">Session Info:</Typography>
						<pre>{JSON.stringify(session, null, 2)}</pre>
					</Box>
				)}
			</Box>
		</Container>
	);
}
