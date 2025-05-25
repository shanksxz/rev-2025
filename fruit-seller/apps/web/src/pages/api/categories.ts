import { categories, db } from "@repo/database";
import { getSession } from "@/auth/session";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCategories = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const categories = await db.query.categories.findMany();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to get categories" });
    }
};

export const createCategory = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const session = await getSession(req, res);
        if (!session || session.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newCategory = await db.insert(categories).values(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Failed to create category" });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            await getCategories(req, res);
            break;
        case "POST":
            await createCategory(req, res);
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
