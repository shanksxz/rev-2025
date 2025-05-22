// import { db, eq, sessions } from "@repo/database";
// import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "secret";

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

// export async function createSession(id: string) {
//     const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

//     const token = await encrypt({ userId: id, expiresAt });

// //     const [session] = await db
// //         .insert(sessions)
// //         .values({
// //             id: crypto.randomUUID(),
// //             userId: id,
// //             token,
// //             expiresAt,
// //         })
// //         .returning();

// //     const sessionId = session.id;

// //     cookies().set("session", sessionId, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === "production",
// //         expires: expiresAt,
// //         sameSite: "lax",
// //         path: "/",
// //     });
// // }

// // export async function deleteSession() {
// //     const sessionId = cookies().get("session")?.value;
// //     if (!sessionId) {
// //         return;
// //     }
// //     await db.delete(sessions).where(eq(sessions.id, sessionId));
// //     cookies().delete("session");
// // }

// "use server-only"
// export async function getSession() {
// 	const sessionId = cookies().get("session")?.value;

// 	if (!sessionId) {
// 		return null;
// 	}
// 	const session = await db.query.sessions.findFirst({
// 		where: eq(sessions.id, sessionId),
// 		with: {
// 			user: {
// 				columns: {
// 					role: true,
// 					firstName: true,
// 					lastName: true,
// 					email: true,
// 				},
// 			},
// 		},
// 	});

// 	return session;
// }
