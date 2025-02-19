import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

const AUTH_ROUTES = ["/login", "/signup"];
const DASHBOARD_ROUTE = "/dashboard";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const user = await getSession();

  if (AUTH_ROUTES.includes(pathname) && user) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, req.url));
  }

  if (pathname.startsWith(DASHBOARD_ROUTE) && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
