'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '@/features/product/actions/add-product';
import { CreateProductInput } from '@/types/product';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .moreThan(0, 'Price must be greater than 0')
    .required('Price is required'),
  image: yup.string().required('Image URL is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
});

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProductFormDialog({ open, onClose }: ProductFormDialogProps) {
  const queryClient = useQueryClient();
  
  const addMutation = useMutation({
    mutationFn: (values: CreateProductInput) => addProduct(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      price: 0,
      stock: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      addMutation.mutate(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Add New Product
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
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
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              size="small"
            />
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
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={handleClose} 
            color="inherit" 
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            color="primary" 
            variant="contained"
            disabled={addMutation.isPending}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            {addMutation.isPending ? 'Adding...' : 'Add Product'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 