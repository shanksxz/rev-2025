import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ProductForm } from "@/features/products/components/product-form";
import { Box, CircularProgress } from "@mui/material";
import { getProduct } from "@/features/products/api/get-product";

const EditProduct: NextPageWithLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id as string),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ProductForm
            //@ts-ignore
            initialValues={product}
            isEdit={true}
            productId={id as string}
        />
    );
};

EditProduct.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout title="Edit Product">
            {page}
        </DashboardLayout>
    );
};

export default EditProduct; 