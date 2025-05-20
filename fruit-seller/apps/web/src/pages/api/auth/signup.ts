import { signUpSchema } from "@/types";
import { db, sessions, users } from "@repo/database";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { email, password, firstName, lastName } = signUpSchema.validateSync(
			req.body,
		);
		const hashedPassword = await bcrypt.hash(password, 10);

		const [user] = await db
			.insert(users)
			.values({
				email,
				password_hash: hashedPassword,
				firstName,
				lastName,
			})
			.returning();

		if (!user) {
			return res.status(500).json({ message: "Failed to create user" });
		}

		const [session] = await db
			.insert(sessions)
			.values({
				id: crypto.randomUUID(),
				userId: user.id,
				token: crypto.randomUUID(),
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
			})
			.returning();

		res.setHeader(
			"Set-Cookie",
			serialize("session", session.id, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				expires: session.expiresAt,
				sameSite: "lax",
				path: "/",
			}),
		);

		return res.status(200).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	return signup(req, res);
}
