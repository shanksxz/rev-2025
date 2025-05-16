'use client';

import { Container, Paper, Typography, TextField, Button, Box, Grid, InputAdornment } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '@/app/actions/product/add-product';
import { CreateProductInput } from '@/types/product';

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup
        .number()
        .typeError('Price must be a number')
        .moreThan(0, 'Price must be greater than 0')
        .required('Price is required'),
    image: yup.string().required('Image url is required'),
    stock: yup
        .number()
        .typeError('Stock must be a number')
        .min(0, 'Stock cannot be negative')
        .required('Stock is required'),
});

export default function Page() {
    const { mutate, isPending } = useMutation({
        mutationKey: ['add-product'],
        mutationFn: (values: CreateProductInput) => addProduct(values),
        onSuccess: () => {
            alert('Product added successfully');
        }
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            image: '',
            price: 0,
            stock: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutate(values);
        },
    });

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button startIcon={<ArrowBack />} color="inherit" sx={{ fontWeight: 500 }}>
                        Back to Products
                    </Button>
                </Link>
            </Box>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 4 },
                    border: '1px solid #e0e0e0',
                    borderRadius: 3,
                    background: '#fff',
                }}
            >
                <Typography variant="h5" component="h1" fontWeight={700} mb={2}>
                    Add New Product
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 2 }}
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Product Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                autoFocus
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                multiline
                                rows={3}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Price"
                                name="price"
                                type="number"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Image URL"
                                name="image"
                                placeholder="https://example.com/image.jpg"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.image && Boolean(formik.errors.image)}
                                helperText={formik.touched.image && formik.errors.image}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Stock Quantity"
                                name="stock"
                                type="number"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.stock && Boolean(formik.errors.stock)}
                                helperText={formik.touched.stock && formik.errors.stock}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Box display="flex" gap={2} justifyContent="flex-end" mt={1}>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    component={Link}
                                    href="/admin/products"
                                    sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 2,
                                        px: 3,
                                        boxShadow: "none",
                                        fontWeight: 600,
                                    }}
                                >
                                    Create Product
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
