import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/s/")) {
    const shortCode = pathname.split("/")[2];

    const response = await fetch(
      `${request.nextUrl.origin}/api/redirect/${shortCode}`
    );
    const data = await response.json();

    if (!data.url) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    } else {
      return NextResponse.redirect(data.url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/s/:path*"],
};
