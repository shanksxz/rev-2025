import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/app-layout";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/use-cart";
import {
	Typography,
	Box,
	CardMedia,
	Button,
	Container,
	Grid,
	Chip,
	Divider,
	Rating,
	Skeleton,
	Alert,
	Stack,
	Paper,
	IconButton,
	TextField,
	Snackbar,
} from "@mui/material";
import {
	ShoppingCart,
	Favorite,
	Share,
	ArrowBack,
	Add,
	Remove,
} from "@mui/icons-material";
import { getProduct } from "@/features/products/api/get-product";
import { useQuery } from "@tanstack/react-query";


export default function Page() {

	const router = useRouter();
	const { productId } = router.query;
	const { addItem, updateQuantity, items } = useCart();

	const currentProduct = items.find((item) => item.product.id === productId);

	const { data: product, isLoading, error } = useQuery({
		queryKey: ["product", productId],
		queryFn: () => getProduct(productId as string),
	});

	const handleAddToCart = () => {
		if (!product) return;
		addItem({
			id: crypto.randomUUID(),
			product: product,
			quantity: currentProduct ? currentProduct.quantity + 1 : 1
		});
	};

	const handleIncreaseQuantity = () => {
		if (currentProduct && currentProduct.quantity < currentProduct.product.stock) {
			updateQuantity(productId as string, currentProduct.quantity + 1, currentProduct.product.stock);
		}
	};

	const handleDecreaseQuantity = () => {
		if (currentProduct && currentProduct.quantity > 1) {
			updateQuantity(productId as string, currentProduct.quantity - 1, currentProduct.product.stock);
		}
	};


	if (isLoading) {
		return (
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Box sx={{ display: 'flex', mb: 4 }}>
					<Skeleton variant="rectangular" width={500} height={400} sx={{ mr: 4 }} />
					<Box sx={{ width: '100%' }}>
						<Skeleton variant="text" height={60} width="70%" />
						<Skeleton variant="text" height={30} width="40%" />
						<Skeleton variant="text" height={120} />
						<Skeleton variant="rectangular" height={50} width={200} sx={{ mt: 2 }} />
					</Box>
				</Box>
			</Container>
		);
	}

	if (error || !product) {
		return (
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Alert severity="error" sx={{ mb: 4 }}>
					{error instanceof Error ? error.message : "Product not found"}
				</Alert>
			</Container>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 2 }}>
			<Button
				startIcon={<ArrowBack />}
				onClick={() => router.back()}
				sx={{ mb: 4 }}
			>
				Back to Products
			</Button>

			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Paper elevation={2} sx={{ overflow: 'hidden', borderRadius: 2 }}>
						<CardMedia
							component="img"
							image={product.image || "https://source.unsplash.com/random?fruit"}
							alt={product.name}
							sx={{
								height: 500,
								objectFit: 'cover',
							}}
						/>
					</Paper>
				</Grid>

				<Grid item xs={12} md={6}>
					<Box>
						<Typography variant="h3" component="h1" gutterBottom>
							{product.name}
						</Typography>

						{product.categoryId && (
							<Chip
								label="Seasonal Fruit"
								color="primary"
								size="small"
								sx={{ mb: 2 }}
							/>
						)}

						<Typography
							variant="h4"
							color="primary"
							sx={{ fontWeight: 'bold', mb: 2 }}
						>
							${product.price.toFixed(2)}
						</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<Rating value={4.5} precision={0.5} readOnly />
							<Typography variant="body2" sx={{ ml: 1 }}>
								(24 reviews)
							</Typography>
						</Box>

						<Divider sx={{ my: 3 }} />

						<Typography variant="body1" paragraph sx={{ mb: 4 }}>
							{product.description || "Delicious fresh fruit, hand-picked at the peak of its flavor. Our fruits are sourced from local farms committed to sustainable and organic farming practices."}
						</Typography>

						<Box sx={{ mb: 3 }}>
							<Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
								Availability:
							</Typography>
							<Typography color={product.stock > 0 ? "success.main" : "error.main"}>
								{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
							</Typography>
						</Box>

						{product.stock > 0 && (
							<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
								<Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 'bold' }}>
									Quantity:
								</Typography>
								<Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: 'fit-content' }}>
									<IconButton
										size="small"
										onClick={handleDecreaseQuantity}
										disabled={currentProduct && currentProduct.quantity <= 1}
									>
										<Remove fontSize="small" />
									</IconButton>
									<TextField
										value={currentProduct ? currentProduct.quantity : 1}
										type="number"
										inputProps={{
											min: 1,
											max: product.stock,
											sx: { textAlign: 'center', width: '40px', padding: '8px 0' }
										}}
										variant="standard"
										sx={{ '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:after': { borderBottom: 'none' } }}
										onChange={(e) => {
											const val = parseInt(e.target.value);
											if (!isNaN(val) && val >= 1 && val <= product.stock) {
												updateQuantity(productId as string, val, product.stock);
											}
										}}
									/>
									<IconButton
										size="small"
										onClick={handleIncreaseQuantity}
										disabled={currentProduct && currentProduct.quantity >= currentProduct.product.stock}
									>
										<Add fontSize="small" />
									</IconButton>
								</Paper>
							</Box>
						)}

						<Stack direction="row" spacing={2} sx={{ mb: 4 }}>
							<Button
								variant="contained"
								size="large"
								startIcon={<ShoppingCart />}
								onClick={handleAddToCart}
								disabled={product.stock <= 0}
								sx={{ px: 4, py: 1.5 }}
							>
								Add to Cart
							</Button>
							<IconButton aria-label="add to favorites" sx={{ border: '1px solid', borderColor: 'divider' }}>
								<Favorite />
							</IconButton>
							<IconButton aria-label="share" sx={{ border: '1px solid', borderColor: 'divider' }}>
								<Share />
							</IconButton>
						</Stack>
					</Box>
				</Grid>
			</Grid>

		</Container>
	);
}

Page.getLayout = function getLayout(page: React.ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};
