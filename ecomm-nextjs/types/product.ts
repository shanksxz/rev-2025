export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductInput = Partial<CreateProductInput>; 