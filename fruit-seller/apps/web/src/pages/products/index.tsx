import { getProducts } from "@/features/products/api/get-products";
import { useCart } from "@/hooks/use-cart";
import { Box, CircularProgress, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ProductType } from "@repo/database";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { ProductCard } from "@/features/products/components/product-card";
import AppLayout from "@/components/layout/app-layout";
import { Search as SearchIcon } from "@mui/icons-material";
import useDebounce from "@/hooks/use-debounce";
import { useQueryState } from 'nuqs'

export function ProductPage() {

    const [query, setQuery] = useQueryState("query", { defaultValue: "" });
    const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "name-asc" });
    const debouncedQuery = useDebounce(query, 500);

    const { addItem, removeItem, items } = useCart();

    const { data: products, isPending } = useQuery({
        queryKey: ["products", debouncedQuery, sortBy],
        queryFn: () => getProducts(debouncedQuery, sortBy),
    });

    const handleSortChange = useCallback((event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    }, [setSortBy]);

    const handleAddToCart = useCallback((product: Omit<ProductType, "categoryId">) => {
        addItem({
            id: product.id,
            product: product,
            quantity: 1,
        });
    }, [addItem]);

    const handleRemoveFromCart = useCallback((product: Omit<ProductType, "categoryId">) => {
        removeItem({
            id: product.id,
            product: product,
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
                Explore our products
            </Typography>
            <Box display="flex" gap={2} my={2}>
                <TextField
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    sx={{ flex: 2 }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl sx={{ flex: 1 }} size="small">
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select labelId="sort-label" value={sortBy} onChange={handleSortChange} label="Sort By">
                        <MenuItem value="price-low">Price: Low to High</MenuItem>
                        <MenuItem value="price-high">Price: High to Low</MenuItem>
                        <MenuItem value="name-asc">Name: A to Z</MenuItem>
                        <MenuItem value="name-desc">Name: Z to A</MenuItem>
                    </Select>
                </FormControl>
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