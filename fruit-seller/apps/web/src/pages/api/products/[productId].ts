import { db, eq, products, sessions } from "@repo/database";
import type { NextApiResponse } from "next";
import type { NextApiRequest } from "next";

export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const sessionToken = req.cookies.session;

        if (!sessionToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const session = await db.query.sessions.findFirst({
            where: eq(sessions.token, sessionToken),
            with: {
                user: {
                    columns: {
                        role: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });

        if (!session?.user) {
            return null;
        }

        return session;
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
};

export const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const product = await db.query.products.findFirst({
            where: eq(products.id, req.query.productId as string),
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to get product" });
    }
};

export const deleteProduct = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const session = await getSession(req, res);
        if (!session || session.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await db
            .delete(products)
            .where(eq(products.id, req.query.productId as string));
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};

export const updateProduct = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const session = await getSession(req, res);
        if (!session || session.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id, createdAt, updatedAt, ...rest } = req.body;
        await db
            .update(products)
            .set(rest)
            .where(eq(products.id, req.query.productId as string));
        res.status(200).json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            await getProduct(req, res);
            break;
        case "DELETE":
            await deleteProduct(req, res);
            break;
        case "PUT":
            await updateProduct(req, res);
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
