import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");
  /* const path = request.nextUrl.pathname; */
  if (jwt === undefined) {
    console.log("REQ URL: ", request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }

}

export const config = {
  matcher: ["/", "/mi-cuenta", "/create", "/dashboard", "/admin/:path*"],
};
