import { db, eq } from "@repo/database";
import { sessions } from "@repo/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export async function logout(req: NextApiRequest, res: NextApiResponse) {
    try {
        const sessionToken = req.cookies.session;
        if (!sessionToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await db.delete(sessions).where(eq(sessions.token, sessionToken));
        res.setHeader("Set-Cookie", serialize("session", "", { maxAge: 0 }));
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    return logout(req, res);
}
