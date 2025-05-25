import { db, products, and, ilike, desc, asc } from "@repo/database";
import { getSession } from "@/auth/session";
import type { NextApiRequest, NextApiResponse } from "next";

enum SortBy {
    PRICE_ASC = "price-low",
    PRICE_DESC = "price-high",
    NAME_ASC = "name-asc",
    NAME_DESC = "name-desc",
}

export const getProducts = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { query, sortBy } = req.query;
        const condition = [];
        if (query && query?.length > 0)
            condition.push(ilike(products.name, `%${query}%`));

        let orderBy;
        const sortValue = Array.isArray(sortBy) ? sortBy[0] : sortBy;
        if (sortValue && typeof sortValue === "string") {
            switch (sortValue) {
                case SortBy.PRICE_ASC:
                    orderBy = asc(products.price);
                    break;
                case SortBy.PRICE_DESC:
                    orderBy = desc(products.price);
                    break;
                case SortBy.NAME_ASC:
                    orderBy = asc(products.name);
                    break;
                case SortBy.NAME_DESC:
                    orderBy = desc(products.name);
                    break;
                default:
                    break;
            }
        }
        const searchProducts = await db.query.products.findMany({
            where: condition.length > 0 ? and(...condition) : undefined,
            orderBy: orderBy,
        });

        res.status(200).json(searchProducts);
    } catch (error) {
        res.status(500).json({ message: "Failed to get products" });
    }
};

export const createProduct = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const session = await getSession(req, res);
        if (!session || session.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newProduct = await db.insert(products).values(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
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
