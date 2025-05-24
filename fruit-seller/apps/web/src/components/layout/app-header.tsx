import { AppBar, Toolbar, Typography, Badge, Link, Box, Container } from '@mui/material';
import { ShoppingCart, Person, Dashboard } from '@mui/icons-material';
import { useCart } from '@/hooks/use-cart';
import useSession from '@/auth/use-session';

export default function AppHeader() {
    const { totalItems } = useCart();
    const { session } = useSession();
    return (
        <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ minHeight: 64, px: 0, mx: 0, display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        <Link
                            href="/"
                            underline="none"
                            sx={{
                                letterSpacing: 1,
                                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                                fontWeight: 700,
                                transition: "opacity 0.2s",
                                "&:hover": { opacity: 0.7 }
                            }}
                        >
                            Fruitopia
                        </Link>
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {session?.user.role === "admin" && (
                            <Link href="/dashboard" underline="none" color="black">
                                <Dashboard sx={{ color: "black", fontSize: 24 }} />
                            </Link>
                        )}
                        <Link href={session?.user.firstName ? "/profile" : "/auth/signin"} underline="none" color="black">
                            <Person sx={{ color: "black", fontSize: 24 }} />
                        </Link>

                        <Link href="/cart" underline="none" color="black">
                            <Badge
                                badgeContent={totalItems}
                                color="primary"
                            >
                                <ShoppingCart sx={{ color: "black", fontSize: 24 }} />
                            </Badge>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}