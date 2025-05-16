import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CreateProductInput } from '@/types/product';

export async function GET() {
  try {
    const products = await db.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await db.createProduct(body as CreateProductInput);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 