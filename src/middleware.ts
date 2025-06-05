import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

import { tokenVerify } from "@/lib/api/auth";

const publicRoutes = [
  { path: "/entrar", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/entrar";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    try {
      const res = await tokenVerify(authToken.value);

      if (res) {
        return NextResponse.next();
      } else {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete("token");
        response.cookies.delete("id");
        response.cookies.delete("name");
        response.cookies.delete("email");
        return response;
      }
    } catch (err) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete("token");
      response.cookies.delete("id");
      response.cookies.delete("name");
      response.cookies.delete("email");
      return response;
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
