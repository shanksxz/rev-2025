import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { ReactElement } from "react";
import { ProductForm } from "@/features/products/components/product-form";

const CreateProduct: NextPageWithLayout = () => {
    return <ProductForm
        initialValues={{
            name: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            image: ""
        }}
        isEdit={false}
    />;
};

CreateProduct.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout title="Create Product">
            {page}
        </DashboardLayout>
    );
};

export default CreateProduct;