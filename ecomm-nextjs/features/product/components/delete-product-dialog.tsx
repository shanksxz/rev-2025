'use client';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@/features/product/actions/delete-product';
import { Product } from '@/types/product';

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function DeleteProductDialog({ open, onClose, product }: DeleteProductDialogProps) {
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    },
  });

  const handleConfirm = () => {
    if (product) {
      deleteMutation.mutate(product.id);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Product
        <IconButton
          aria-label="close"
          onClick={onClose}
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
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{product?.name}"? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button 
          onClick={onClose} 
          color="inherit" 
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="error" 
          variant="contained"
          sx={{ borderRadius: 2, textTransform: 'none' }}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 