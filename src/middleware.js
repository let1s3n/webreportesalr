import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");
  const path = request.nextUrl.pathname;
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET)
    );

    // Aca agregar rutas que requieren permisos de administrador
    if (["/create"].includes(path)) {
      return isAdmin(request, payload);
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export async function isAdmin(request, payload) {
  const { roles } = payload;

  for (let role of roles) {
    if (role["name"] === "admin") {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}

export const config = {
  matcher: ["/dashboard", "/create", "/admin/:path*"],
};
