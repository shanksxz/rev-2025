'use client';

import { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActions, Button, CircularProgress } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/features/product/actions/get-products';
import { Product } from '@/types/product';
import ProductFormDialog from '@/features/product/components/product-form-dialog';
import DeleteProductDialog from '@/features/product/components/delete-product-dialog';

export default function Page() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Add New Product
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || '/placeholder.png'}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1} sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}>
                    {product.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stock: {product.stock}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    fullWidth
                    onClick={() => handleDeleteClick(product)}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Delete Product
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <ProductFormDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </Container>
  );
} 