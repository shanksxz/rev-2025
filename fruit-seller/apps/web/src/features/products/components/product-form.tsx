import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Stack } from "@mui/material";
import { getCategories } from "@/features/categories/api/get-categories";
import { createProduct } from "@/features/products/api/create-product";
import { editProduct } from "@/features/products/api/edit-product";

const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required").moreThan(0, "Price must be greater than 0"),
    stock: yup.number().required("Stock is required"),
    categoryId: yup.string().required("Category is required"),
    image: yup.string().url("Invalid image URL").required("Image is required"),
});

type ProductType = yup.InferType<typeof validationSchema>;

export const ProductForm = ({ initialValues, isEdit = false, productId }: { initialValues: ProductType, isEdit: boolean, productId?: string }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const { mutate: addProduct, isPending: isCreating } = useMutation({
        mutationFn: (values: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>) => createProduct(values),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            router.push("/dashboard/products");
        }
    });

    const { mutate: updateProduct, isPending: isUpdating } = useMutation({
        mutationFn: (values: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>) => editProduct(values, productId as string),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            router.push("/dashboard/products");
        }
    });

    const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
        mutationFn: () => api.delete(`/products/${productId}`),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            router.push("/dashboard/products");
        }
    });

    const formik = useFormik({
        initialValues: initialValues || {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            image: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (isEdit) {
                updateProduct(values);
            } else {
                addProduct(values);
            }
        },
        enableReinitialize: true,
    });

    const isPending = isCreating || isUpdating;
    const submitButtonText = isPending
        ? (isEdit ? "Updating..." : "Creating...")
        : (isEdit ? "Update Product" : "Create Product");

    return (
        <Box component="form" onSubmit={formik.handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
                fullWidth
                placeholder="Product Name"
                label="Product Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                size="small"
            />
            <TextField
                fullWidth
                placeholder="Product Description"
                label="Description"
                name="description"
                multiline
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                size="small"
            />
            <FormControl
                fullWidth
                error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                size="small"
            >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    name="categoryId"
                    label="Category"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Select a category"
                    required
                >
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
                {formik.touched.categoryId && formik.errors.categoryId && (
                    <FormHelperText>{formik.errors.categoryId}</FormHelperText>
                )}
            </FormControl>
            <Stack direction="row" spacing={2}>
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    size="small"
                />
                <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                    size="small"
                />
            </Stack>
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
                size="small"
            />
            <Box display="flex" gap={2} justifyContent="flex-end">
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={isPending || isDeleting}>
                    {submitButtonText}
                </Button>
                <Button type="button" fullWidth variant="outlined" color="error" onClick={() => router.push("/dashboard/products")} disabled={isPending || isDeleting}>Cancel</Button>
            </Box>
        </Box>
    );
};

