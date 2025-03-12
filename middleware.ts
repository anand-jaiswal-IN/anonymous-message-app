import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("meeting with middleware");
  const token = await getToken({ req: request });
  // console.log(token);

  const url = request.nextUrl;

  if (
    token &&
    !token.isVerified && // User is not verified
    url.pathname.startsWith("/auth/user") &&
    url.pathname.endsWith("/verify")
  ) {
    return NextResponse.next(); // Allow access
  }
  if (token && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/data (SSG data cache)
     */
    "/((?!api|_next/static|_next/data).*)",
  ],
};
