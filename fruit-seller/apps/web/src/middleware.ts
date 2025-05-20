import api from "@/lib/api-client";
import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./auth/session";
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/", "/signup", "/signin"];

export type Session = {
	id: string;
	userId: string;
	token: string;
	expiresAt: Date;
	user: {
		role: string;
		firstName: string;
		lastName: string;
		email: string;
	};
};

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	//? unfortunately can't use getSession() here because can't use db here
	//? conflict coz nextjs middleware runs on edge runtime
	const session = request.cookies.get("session");

	if (isProtectedRoute && !session) {
		return NextResponse.redirect(new URL("/auth/signin", request.url));
	}

	if (isPublicRoute && session) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
