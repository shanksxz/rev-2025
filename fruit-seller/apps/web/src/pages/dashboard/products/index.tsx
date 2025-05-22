import React, { ReactElement } from 'react';
import DashboardLayout from '../../../components/layout/dashboard-layout';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    TextField,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { NextPageWithLayout } from '../../_app';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProducts } from '@/features/products/api/get-products';

const ProductsPage: NextPageWithLayout = () => {

    const router = useRouter();
    const { data: products, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    if (isPending) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
        </Box>
    )

    if (!products || products.length === 0) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="h6">No products found</Typography>
        </Box>
    )

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: '300px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/dashboard/products/create')}
                >
                    Add Product
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="products table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            {/* <TableCell>Category</TableCell> */}
                            <TableCell align="right">Price ($)</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            {/* <TableCell>Status</TableCell> */}
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                {/* <TableCell>{product.category}</TableCell> */}
                                <TableCell align="right">{product.price.toFixed(2)}</TableCell>
                                <TableCell align="right">{product.stock}</TableCell>
                                {/* <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color:
                                                product.status === 'In Stock' ? 'success.main' :
                                                    product.status === 'Low Stock' ? 'warning.main' :
                                                        'error.main',
                                            fontWeight: 'medium',
                                        }}
                                    >
                                        {product.status}
                                    </Typography>
                                </TableCell> */}
                                <TableCell align="center">
                                    <Button size="small" onClick={() => router.push(`/dashboard/products/${product.id}`)} sx={{ mr: 1 }}>Edit</Button>
                                    <Button size="small" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout title="Products Management">{page}</DashboardLayout>;
};

export default ProductsPage;
