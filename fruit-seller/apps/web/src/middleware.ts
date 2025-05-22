import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/dashboard",
    "/checkout",
    "/orders",
    "/account",
    "/wishlist",
];

const adminRoutes = [
    "/dashboard",
    "/products/manage",
    "/orders/manage",
    "/users/manage",
];

type Session = {
    user: {
        role: string;
    };
};

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(
        (route) => path === route || path.startsWith(`${route}/`)
    );

    const isAdminRoute = adminRoutes.some(
        (route) => path === route || path.startsWith(`${route}/`)
    );

    const sessionResponse = await fetch(
        "http://localhost:3000/api/auth/session",
        {
            headers: {
                Cookie: request.headers.get("cookie") || "",
            },
        }
    );

    const session = (await sessionResponse.json()) as Session;
    const role = session?.user?.role;
    const isAuthenticated = sessionResponse.status === 200;
    const isAdmin = role === "admin";

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (isAdminRoute && (!isAuthenticated || !isAdmin)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if ((path === "/signin" || path === "/signup") && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|_next/script|favicon.ico|.*\\.png$).*)",
    ],
};
