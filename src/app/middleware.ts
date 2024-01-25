import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/app/lib/auth";

export const config = {
  matcher: "/home",
};

export async function middleware(request: NextRequest) {
  try {
    await verifyAccessToken(request);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
