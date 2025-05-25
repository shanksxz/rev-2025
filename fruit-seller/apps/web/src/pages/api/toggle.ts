//? this route is only for development purposes

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@/auth/session";
import { db, users, eq } from "@repo/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const session = await getSession(req, res);
        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = session;
        await db
            .update(users)
            .set({
                role: user.role === "admin" ? "user" : "admin",
            })
            .where(eq(users.email, user.email));

        res.status(200).json({ message: "User role updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
