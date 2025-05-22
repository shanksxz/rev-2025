import { getProducts } from "@/features/products/api/get-products";
import { useCart } from "@/hooks/use-cart";
import { Box, CircularProgress, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { ProductType } from "@repo/database";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { ProductCard } from "@/features/products/components/product-card";
import AppLayout from "@/components/layout/app-layout";
import { Search as SearchIcon } from "@mui/icons-material";

// export async function getServerSideProps() {
//     const products = await getProducts();
//     return {
//         props: { products },
//     };
// }

export function ProductPage() {
    const { addItem, removeItem, items } = useCart();
    const { data: products, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    const handleAddToCart = useCallback((product: ProductType) => {
        addItem({
            id: product.id,
            productId: product.id,
            quantity: 1,
        });
    }, [addItem]);

    const handleRemoveFromCart = useCallback((product: ProductType) => {
        removeItem({
            id: product.id,
            productId: product.id,
            quantity: 1,
        });
    }, [removeItem]);

    if (isPending) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!products || products.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant="h4" component="h1">
                    No products found
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1">
                Our Products
            </Typography>
            <Box sx={{ display: 'flex', my: 2 }}>
                <TextField
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} >
                    {products.map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                            <ProductCard
                                product={product}
                                onAddToCart={handleAddToCart}
                                onRemoveFromCart={handleRemoveFromCart}
                                isInCart={items.some((item) => item.id === product.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

ProductPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    );
};

export default ProductPage;