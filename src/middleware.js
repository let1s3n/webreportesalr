import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export function middleware(request) {
  const jwt = request.cookies.get("myTokenName");
  /* const path = request.nextUrl.pathname; */
  if (jwt === undefined) {
    console.log("REQ URL: ", request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create", "/dashboard"],
};
