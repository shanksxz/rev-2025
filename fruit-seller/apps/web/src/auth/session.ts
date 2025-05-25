import jwt from "jsonwebtoken";
import { db, eq, sessions } from "@repo/database";
const secretKey = process.env.JWT_SECRET_KEY || "secret";
import { NextApiRequest, NextApiResponse } from "next";

export type SessionPayload = {
    userId: string;
    role: "admin" | "user";
    expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
    return jwt.sign(payload, secretKey, { expiresIn: "30d" });
}

export async function decrypt(token: string) {
    try {
        const payload = jwt.verify(token, secretKey);
        return payload as SessionPayload;
    } catch (error) {
        console.error(error);
        return null;
    }
}

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
