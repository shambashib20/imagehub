import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        console.log(pathname, "fmkfvmk");

        // Allow auth related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Allow public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/api/products") ||
          pathname.startsWith("/products")
        ) {
          return true;
        }

        // Admin routes need admin role
        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        // All other routes need authenticaton
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * 1 favicon.ico (favicon file)
     * - public folder
     */
    "/((?!onext/static|_next/image | favicon.ico | public/).*)",
  ],
};
