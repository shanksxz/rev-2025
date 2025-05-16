'use client';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    CardActions,
    Rating,
} from '@mui/material';
import { AddShoppingCart, RemoveShoppingCart } from '@mui/icons-material';
import { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (product: Product) => void;
    isInCart: boolean;
}

export function ProductCard({
    product,
    onAddToCart,
    onRemoveFromCart,
    isInCart,
}: ProductCardProps) {
    return (
        <Card
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                component="img"
                height="200"
                sx={{
                    objectFit: 'cover',
                }}
                image={product.image || '/placeholder.png'}
                alt={product.name}
            />
            <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        overflow: 'hidden',
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        minHeight: '4.5em',
                    }}
                >
                    {product.description}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 700, letterSpacing: 0.5 }}
                    >
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Rating value={4.5} precision={0.5} size="small" readOnly />
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={isInCart ? <RemoveShoppingCart /> : <AddShoppingCart />}
                    color={isInCart ? 'error' : 'primary'}
                    onClick={() =>
                        isInCart ? onRemoveFromCart(product) : onAddToCart(product)
                    }
                    sx={{
                        borderRadius: 3,
                        fontWeight: 600,
                        textTransform: 'none',
                        py: 1.1,
                        fontSize: '1rem',
                    }}
                >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
            </CardActions>
        </Card>
    );
}
