import { getCurrentUser } from "@/services/Authservice";
import { NextRequest, NextResponse } from "next/server";

const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard\/admin/],  // Adjusted path to your admin dashboard route
};

const authRoutes = ["/sign-in", "/signUp", "/login"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get user info from token/cookie
  const userInfo = await getCurrentUser();
console.log(userInfo, "userInfo from middleware");
  // Allow unauthenticated users to access public auth routes
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    // Redirect to login page with redirect path
    return NextResponse.redirect(new URL(`https://nexa-tech-delta.vercel.app/login?redirectPath=${pathname}`, request.url));
  }

  // If user is logged in and route requires role check
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as keyof typeof roleBasedPrivateRoutes]) {
    const allowedRoutes = roleBasedPrivateRoutes[userInfo.role as keyof typeof roleBasedPrivateRoutes];
    // If current pathname matches allowed route pattern, let through
    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
    // User is logged in but tries to access unauthorized route
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For other routes not explicitly protected by roles, allow
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/admin/:path*",  // run middleware on all admin dashboard routes
    // Add other protected routes here if you want
  ],
};
