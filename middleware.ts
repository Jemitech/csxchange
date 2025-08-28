import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes
const protectedRoutes = ["/dashboard", "/profile", "/messages", "/sessions"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token = request.cookies.get("token")?.value

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // This avoids Edge Runtime compatibility issues with jsonwebtoken
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/messages/:path*", "/sessions/:path*"],
}
