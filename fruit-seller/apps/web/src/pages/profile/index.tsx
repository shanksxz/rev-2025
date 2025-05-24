import useSession from "@/auth/use-session";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";
import { Person, Email, CalendarToday, Logout } from "@mui/icons-material";
import { useCart } from "@/hooks/use-cart";
import AppLayout from "@/components/layout/app-layout";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { useRouter } from "next/router";

export default function ProfilePage() {
    const { session, isLoading } = useSession();
    const { totalItems } = useCart();
    const router = useRouter();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: () => api.post("/auth/logout"),
        onSuccess: () => {
            router.push("/");
        },
    });

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!session) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h5" textAlign="center">
                    Please sign in to view your profile
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                mb: 2,
                                border: "4px solid white",
                            }}
                        >
                            {session.user.firstName[0]}
                            {session.user.lastName[0]}
                        </Avatar>
                        <Typography variant="h4" gutterBottom>
                            {session.user.firstName} {session.user.lastName}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card elevation={0} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" mb={2}>Profile Information</Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Person color="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                First Name
                                            </Typography>
                                            <Typography variant="body1">
                                                {session.user.firstName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Person color="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Last Name
                                            </Typography>
                                            <Typography variant="body1">
                                                {session.user.lastName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Email color="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Email
                                            </Typography>
                                            <Typography variant="body1">
                                                {session.user.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <CalendarToday color="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Member Since
                                            </Typography>
                                            <Typography variant="body1">
                                                {new Date(session.user.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 2 }} />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<Logout />}
                                        onClick={() => logout()}
                                        disabled={isLoggingOut}
                                        fullWidth
                                    >
                                        {isLoggingOut ? "Logging out..." : "Logout"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Activity Summary
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: "center",
                                            bgcolor: "primary.light",
                                            color: "primary.contrastText",
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4">0</Typography>
                                        <Typography variant="body2">Orders</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: "center",
                                            bgcolor: "secondary.light",
                                            color: "secondary.contrastText",
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4">{totalItems}</Typography>
                                        <Typography variant="body2">Cart Items</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}


ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
};
