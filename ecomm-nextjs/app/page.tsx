'use client';

import { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/cart-context';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, removeItem, items } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={() => addItem({
                id: product.id,
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                maxQuantity: 10,
              })}
              onRemoveFromCart={() => removeItem({
                id: product.id,
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                maxQuantity: 10,
              })}
              isInCart={items.some((item) => item.id === product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
