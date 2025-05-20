import { db, products } from "@repo/database";
import type { NextApiRequest, NextApiResponse } from "next";

export const getProducts = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	try {
		const products = await db.query.products.findMany();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: "Failed to get products" });
	}
};

export const createProduct = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	try {
		const newProduct = await db.insert(products).values(req.body);
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(500).json({ message: "Failed to create product" });
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case "GET":
			await getProducts(req, res);
			break;
		case "POST":
			await createProduct(req, res);
			break;
		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
