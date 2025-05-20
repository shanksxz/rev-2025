import { db, eq } from "@repo/database";
import { sessions } from "@repo/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function logout(req: NextApiRequest, res: NextApiResponse) {
	try {
		const sessionId = cookies().get("session")?.value;
		if (!sessionId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		await db.delete(sessions).where(eq(sessions.id, sessionId));
		cookies().delete("session");
		return res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	return logout(req, res);
}
