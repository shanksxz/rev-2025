import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { AddShoppingCart, RemoveShoppingCart } from '@mui/icons-material';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
  isInCart: boolean;
}

export function ProductCard({ product, onAddToCart, onRemoveFromCart, isInCart }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/placeholder-image.jpg'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <IconButton
            color={isInCart ? "error" : "primary"}
            onClick={() => isInCart ? onRemoveFromCart(product) : onAddToCart(product)}
            aria-label={isInCart ? "remove from cart" : "add to cart"}
          >
            {isInCart ? <RemoveShoppingCart /> : <AddShoppingCart />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
} 