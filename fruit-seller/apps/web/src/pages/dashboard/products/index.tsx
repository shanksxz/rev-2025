import React, { ReactElement, useState } from 'react';
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
    CircularProgress,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { NextPageWithLayout } from '../../_app';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProducts } from '@/features/products/api/get-products';
import DeleteProductDialog from '@/features/products/components/delete-produtc-dialog';
import { ProductType as Product } from '@repo/database';

const ProductsPage: NextPageWithLayout = () => {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState<string | null>(null);

    const { data: products, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
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
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
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
                    sx={{ width: { xs: '100%', sm: '300px' } }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/dashboard/products/create')}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Add Product
                </Button>
            </Box>

            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="products table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell width="100px" sx={{ whiteSpace: 'nowrap' }}>ID</TableCell> */}
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Image</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Name</TableCell>
                                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>Price ($)</TableCell>
                                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>Stock</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <TableCell component="th" scope="row" width="100px" sx={{ whiteSpace: 'nowrap' }}>
                                        {product.id}
                                    </TableCell> */}
                                    <TableCell>
                                        {product.image && (
                                            <Box
                                                component="img"
                                                src={product.image}
                                                alt={product.name}
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    objectFit: 'cover',
                                                    borderRadius: 1
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{product.name}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{product.price.toFixed(2)}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{product.stock}</TableCell>
                                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                                        <IconButton onClick={() => router.push(`/dashboard/products/${product.id}`)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            setOpen(true);
                                            setProductId(product.id);
                                        }}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <DeleteProductDialog
                open={open}
                onClose={() => setOpen(false)}
                productId={productId}
            />
        </Box>
    );
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProductsPage;
