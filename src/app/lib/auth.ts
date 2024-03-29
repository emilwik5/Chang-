import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";

export async function verifyAccessToken(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    throw Error("No access token in cookies.");
  }

  try {
    const verified = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    return verified.payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function userFromToken(accessToken: string) {
  try {
    const verified = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    const user = await prisma.user.findFirst({
      where: {
        // @ts-ignore
        id: verified.payload.id,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleLogin(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw Error("User does not exist.");
  }

  const verified = await argon2.verify(user.password, password);

  if (!verified) {
    throw Error("Invalid credentials");
  }

  return user;
}
