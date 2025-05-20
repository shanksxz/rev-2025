import api from "@/lib/api-client";
import { signInSchema } from "@/types";
import type { SignInSchemaType } from "@/types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();

	const { mutate: signIn, isPending } = useMutation({
		mutationFn: async (values: SignInSchemaType) => {
			return api.post("/auth/signin", values);
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: signInSchema,
		onSubmit: (values) => {
			signIn(values);
		},
	});

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
				py: 4,
			}}
		>
			<Container maxWidth="sm">
				<Paper
					elevation={6}
					sx={{
						borderRadius: 3,
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{
							p: 5,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar
							sx={{
								m: 1,
								bgcolor: "primary.main",
								width: 56,
								height: 56,
								boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
							}}
						>
							<LockOutlinedIcon fontSize="large" />
						</Avatar>
						<Typography
							component="h1"
							variant="h4"
							sx={{
								mt: 2,
								mb: 4,
								fontWeight: 600,
								color: "text.primary",
							}}
						>
							Welcome Back
						</Typography>
						<Box
							component="form"
							onSubmit={formik.handleSubmit}
							sx={{ width: "100%" }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={Boolean(formik.errors.email)}
								helperText={
									formik.errors.email ? "Enter a valid email address" : ""
								}
								sx={{
									mb: 2,
									"& .MuiOutlinedInput-root": {
										borderRadius: 2,
									},
								}}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={Boolean(formik.errors.password)}
								helperText={
									formik.errors.password ? "Password is required" : ""
								}
								sx={{
									mb: 3,
									"& .MuiOutlinedInput-root": {
										borderRadius: 2,
									},
								}}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={isPending}
								sx={{
									mt: 2,
									mb: 3,
									py: 1.5,
									borderRadius: 2,
									fontWeight: 600,
									textTransform: "none",
									fontSize: "1rem",
									boxShadow: "0 4px 12px rgba(85,108,214,0.25)",
									"&:hover": {
										boxShadow: "0 6px 16px rgba(85,108,214,0.35)",
									},
								}}
							>
								Sign In
							</Button>
							<Grid
								container
								justifyContent="space-between"
								alignItems="center"
								sx={{ mt: 1 }}
							>
								<Grid item>
									<Link
										href="#"
										variant="body2"
										sx={{
											color: "text.secondary",
											textDecoration: "none",
											"&:hover": {
												color: "primary.main",
											},
										}}
									>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link
										href="/auth/signup"
										variant="body2"
										sx={{
											color: "primary.main",
											fontWeight: 500,
											textDecoration: "none",
											"&:hover": {
												textDecoration: "underline",
											},
										}}
									>
										Create an account
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}
