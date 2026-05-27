import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // GET TOKEN FROM COOKIE
  const token = request.cookies.get("accessToken")?.value;

  // CURRENT PATH
  const { pathname } = request.nextUrl;

  // PROTECTED ROUTES
  const protectedRoutes = ["/dashboard"];

  // CHECK IF ROUTE IS PROTECTED
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // IF USER NOT LOGGED IN
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // IF USER LOGGED IN & TRYING TO ACCESS LOGIN PAGE
  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// APPLY MIDDLEWARE
export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
