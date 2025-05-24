// import { sessions, users, db, eq } from "@repo/database";
import { NextApiRequest, NextApiResponse } from "next";

// export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const sessionToken = req.cookies.session;

//         if (!sessionToken) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         const session = await db.query.sessions.findFirst({
//             where: eq(sessions.token, sessionToken),
//             with: {
//                 user: {
//                     columns: {
//                         id: true,
//                         role: true,
//                     },
//                 },
//             },
//         });

//         if (!session?.user) {
//             return null;
//         }

//         return session;
//     } catch (error) {
//         console.error("Session error:", error);
//         return null;
//     }
// };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // try {
    //     const session = await getSession(req, res);
    //     if (!session) {
    //         return res.status(401).json({ message: "Unauthorized" });
    //     }
    //     const { user } = session;
    //     await db
    //         .update(users)
    //         .set({
    //             role: user.role === "admin" ? "user" : "admin",
    //         })
    //         .where(eq(users.id, user.id));

    //     res.status(200).json({ message: "User role updated" });
    // } catch (error) {
    //     res.status(500).json({ message: "Internal server error" });
    // }
}
