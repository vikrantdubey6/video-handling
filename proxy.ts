import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: any } }) {
    const { pathname } = req.nextUrl;

    // Allow public pages
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register"||       
      pathname.startsWith("/api/videos")
    ) {
      return NextResponse.next();
    }

    // Allow NextAuth routes
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // Allow public video fetch
    if (pathname === "/api/videos" && req.method === "GET") {
      return NextResponse.next();
    }

    // Block unauthenticated access
    if (!req.nextauth.token) {
      // API routes should return 401 instead of redirect
      if (pathname.startsWith("/api") ) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // handled manually above
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
