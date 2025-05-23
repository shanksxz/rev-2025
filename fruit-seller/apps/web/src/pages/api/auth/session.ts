import { db, eq, sessions } from "@repo/database";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
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
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        role: true,
                    },
                },
            },
        });

        if (!session?.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.status(200).json(session);
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    return getSession(req, res);
}
