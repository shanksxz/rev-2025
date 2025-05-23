'use client';

import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/hooks/cart-context';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/features/product/actions/get-products';
import { useCallback } from 'react';
import { Product } from '@/types/product';

export default function Home() {
  const { addItem, removeItem, items } = useCart();

  const { data: products, isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const handleAddToCart = useCallback((product: Product) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '/placeholder.png',
      maxQuantity: 10,
    });
  }, []);

  const handleRemoveFromCart = useCallback((product: Product) => {
    removeItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '/placeholder.png',
      maxQuantity: 10,
    });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !products) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error instanceof Error ? error.message : 'An error occurred'}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} >
          {products.map((product) => (
            <Grid key={product.id} size={3}>
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
