import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");
  const path = request.nextUrl.pathname;
  if (jwt === undefined) {
    console.log("REQ URL: ", request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET)
    );

    // Aca agregar rutas que requieren permisos de administrador
    /* if (["/create", "/dashboard"].includes(path)) {
      return isAdmin(request, payload);
    } */

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    console.log("REQ URL 2: ", request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export function isAdmin(request, payload) {
  const { roles } = payload;

  for (let role of roles) {
    if (role["name"] === "admin") {
      return NextResponse.next();
    }
  }

  /* return NextResponse.redirect(new URL("/mi-cuenta", request.url)); */
}

export const config = {
  matcher: ["/", "/mi-cuenta", "/create", "/dashboard", "/admin/:path*"],
};
