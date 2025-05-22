import { Container, Typography, Box, Paper, Grid, IconButton, Divider } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart, CartItem as CartItemType } from '@/hooks/use-cart';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/features/products/api/get-product';
import AppLayout from '@/components/layout/app-layout';

const CartItem = ({ item, onUpdateQuantity, onRemove }: { item: CartItemType, onUpdateQuantity: (productId: string, quantity: number, stock: number) => void, onRemove: (item: CartItemType) => void }) => {

    const { data: product } = useQuery({
        queryKey: ['product', item.productId],
        queryFn: () => getProduct(item.productId),
    });

    return (
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
                    src={product?.image || '/placeholder.png'}
                    alt={product?.name || 'Product Image'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </Box>
            <Box sx={{ flex: 2, minWidth: 120 }}>
                <Typography variant="h6">{product?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    ${product?.price.toFixed(2)} each
                </Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1), product?.stock || 0)}
                    disabled={item.quantity <= 1}
                >
                    <Remove />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(item.productId, Math.min(product?.stock || 0, item.quantity + 1), product?.stock || 0)}
                    disabled={item.quantity >= (product?.stock || 0)}
                >
                    <Add />
                </IconButton>
            </Box>
            <Box sx={{ flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                    size="small"
                    onClick={() => onRemove(item)}
                >
                    <Delete />
                </IconButton>
            </Box>
        </Paper>
    )
}

export default function CartPage() {
    const { items, updateQuantity, removeItem } = useCart();

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
                <Grid item xs={12} md={8}>
                    {items.map((item) => (
                        <Grid key={item.id} item xs={12}>
                            <CartItem
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        </Grid>
                    ))}
                </Grid>
                {/* <Grid item xs={12} md={4}>
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
                </Grid> */}
            </Grid>
        </Container>
    );
}

CartPage.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
};