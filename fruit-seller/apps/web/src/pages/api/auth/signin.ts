import { encrypt } from "@/auth/session";
import { signInSchema } from "@/types";
import { db, eq, sessions, users } from "@repo/database";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export async function signIn(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = signInSchema.validateSync(req.body);

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 7 days
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        const [session] = await db
            .insert(sessions)
            .values({
                userId: user.id,
                token: await encrypt({
                    userId: user.id,
                    role: user.role,
                    expiresAt,
                }),
                expiresAt,
            })
            .returning();

        res.setHeader(
            "Set-Cookie",
            serialize("session", session.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                expires: session.expiresAt,
                sameSite: "lax",
                path: "/",
            })
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Sign in error:", error);
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

    return signIn(req, res);
}
