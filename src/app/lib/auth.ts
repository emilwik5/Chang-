import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function verifyAccessToken(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const verified = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    return verified.payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
