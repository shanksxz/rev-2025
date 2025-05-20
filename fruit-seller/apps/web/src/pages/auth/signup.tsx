import api from "@/lib/api-client";
import { type SignUpSchemaType, signUpSchema } from "@/types";
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
import React, { useState } from "react";

export default function Page() {
	const router = useRouter();

	const { mutate: signup, isPending } = useMutation({
		mutationFn: (values: SignUpSchemaType) => {
			return api.post("/auth/signup", values);
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: signUpSchema,
		onSubmit: (values) => {
			signup(values);
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
								bgcolor: "secondary.main",
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
							Create Account
						</Typography>
						<Box
							component="form"
							onSubmit={formik.handleSubmit}
							sx={{ width: "100%" }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="given-name"
										name="firstName"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										value={formik.values.firstName}
										onChange={formik.handleChange}
										error={
											formik.touched.firstName &&
											Boolean(formik.errors.firstName)
										}
										helperText={
											formik.touched.firstName && formik.errors.firstName
										}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="family-name"
										value={formik.values.lastName}
										onChange={formik.handleChange}
										error={
											formik.touched.lastName && Boolean(formik.errors.lastName)
										}
										helperText={
											formik.touched.lastName && formik.errors.lastName
										}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										error={formik.touched.email && Boolean(formik.errors.email)}
										helperText={formik.touched.email && formik.errors.email}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										autoComplete="new-password"
										value={formik.values.password}
										onChange={formik.handleChange}
										error={
											formik.touched.password && Boolean(formik.errors.password)
										}
										helperText={
											formik.touched.password && formik.errors.password
										}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="confirmPassword"
										label="Confirm Password"
										type="password"
										id="confirmPassword"
										value={formik.values.confirmPassword}
										onChange={formik.handleChange}
										error={
											formik.touched.confirmPassword &&
											Boolean(formik.errors.confirmPassword)
										}
										helperText={
											formik.touched.confirmPassword &&
											formik.errors.confirmPassword
										}
										sx={{
											"& .MuiOutlinedInput-root": {
												borderRadius: 2,
											},
										}}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="secondary"
								disabled={isPending}
								sx={{
									mt: 3,
									mb: 2,
									py: 1.5,
									borderRadius: 2,
									fontWeight: 600,
									textTransform: "none",
									fontSize: "1rem",
									boxShadow: "0 4px 12px rgba(25,133,123,0.25)",
									"&:hover": {
										boxShadow: "0 6px 16px rgba(25,133,123,0.35)",
									},
								}}
							>
								Sign Up
							</Button>
							<Box sx={{ mt: 2, textAlign: "center" }}>
								<Link
									href="/auth/signin"
									variant="body2"
									sx={{
										color: "text.secondary",
										textDecoration: "none",
										"&:hover": {
											color: "secondary.main",
											textDecoration: "underline",
										},
									}}
								>
									Already have an account? Sign in
								</Link>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}
