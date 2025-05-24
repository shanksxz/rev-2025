'use client';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductType as Product } from '@repo/database';
import api from '@/lib/api-client';

interface DeleteProductDialogProps {
    open: boolean;
    onClose: () => void;
    productId: string | null;
}

const deleteProduct = async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
};

export default function DeleteProductDialog({ open, onClose, productId }: DeleteProductDialogProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onClose();
        },
    });

    const handleConfirm = () => {
        if (productId) {
            deleteMutation.mutate(productId);
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
                    Are you sure you want to delete this product? This action cannot be undone.
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