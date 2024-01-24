import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./app/lib/auth";

export const config = {
  matcher: "/home",
};

export async function middleware(request: NextRequest) {
  console.log("middleware");

  const verified = await verifyAccessToken(request);

  if (!verified) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
