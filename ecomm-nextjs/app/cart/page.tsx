'use client';

import { Container, Typography, Box, Paper, Grid, IconButton, Divider } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '@/hooks/cart-context';

export default function CartPage() {
    const { items, updateQuantity, removeItem, total } = useCart();

    if (items.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Cart
                </Typography>
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" color="text.secondary">
                        Your cart is empty
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={3}>
                {/* Cart Items */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {items.map((item) => (
                        <Paper
                            key={item.id}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                                boxShadow: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: 2,
                            }}
                        >
                            {/* Product Image */}
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    flexShrink: 0,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    background: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                            </Box>
                            {/* Product Details */}
                            <Box sx={{ flex: 2, minWidth: 120 }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${item.price.toFixed(2)} each
                                </Typography>
                            </Box>
                            {/* Quantity Controls */}
                            <Box sx={{ flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton
                                    size="small"
                                    onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                                    disabled={item.quantity <= 1}
                                >
                                    <Remove />
                                </IconButton>
                                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => updateQuantity(item, Math.min(item.maxQuantity, item.quantity + 1))}
                                    disabled={item.quantity >= item.maxQuantity}
                                >
                                    <Add />
                                </IconButton>
                            </Box>
                            {/* Price and Remove */}
                            <Box sx={{ flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => removeItem(item)}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}
                </Grid>
                {/* Order Summary */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Typography>Subtotal</Typography>
                            <Typography>${total.toFixed(2)}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Typography>Shipping</Typography>
                            <Typography>Free</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">${total.toFixed(2)}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
