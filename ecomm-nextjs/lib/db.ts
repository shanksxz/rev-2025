import {
    Product,
    CreateProductInput,
    UpdateProductInput,
} from "../types/product";

const PRODUCTS = [
    {
        id: "1",
        name: "Product 1",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Product 1 description",
        image: "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?semt=ais_hybrid&w=740",
    },
    {
        id: "2",
        name: "Product 2",
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Product 2 description",
        image: "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?semt=ais_hybrid&w=740",
    },
    {
        id: "3",
        name: "Product 3",
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Product 3 description",
        image: "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?semt=ais_hybrid&w=740",
    },
];

class MockDB {
    private products: Map<string, Product> = new Map();

    constructor() {
        PRODUCTS.forEach((product) => {
            this.products.set(product.id, product);
        });
    }

    async createProduct(input: CreateProductInput): Promise<Product> {
        const id = crypto.randomUUID();
        const now = new Date();

        const product: Product = {
            id,
            ...input,
            createdAt: now,
            updatedAt: now,
        };

        this.products.set(id, product);
        return product;
    }

    async getProduct(id: string): Promise<Product | null> {
        return this.products.get(id) || null;
    }

    async getAllProducts(): Promise<Product[]> {
        return Array.from(this.products.values());
    }

    async updateProduct(
        id: string,
        input: UpdateProductInput
    ): Promise<Product | null> {
        const product = this.products.get(id);
        if (!product) return null;

        const updatedProduct: Product = {
            ...product,
            ...input,
            updatedAt: new Date(),
        };

        this.products.set(id, updatedProduct);
        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<boolean> {
        return this.products.delete(id);
    }
}

export const db = new MockDB();
