"use server";

import { SignJWT } from "jose";
import { handleLogin } from "./lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(prev: any, formData: FormData) {
  const { email, pw } = {
    email: formData.get("email"),
    pw: formData.get("password"),
  };

  if (!email || !pw) {
    return {
      message: "Email or password not provided.",
    };
  }

  try {
    const user = await handleLogin(email.toString(), pw.toString());
    const signedJwt = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    cookies().set("accessToken", signedJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    redirect("/home");
  } catch (error) {
    console.error(error);

    return {
      message: "Invalid credentials",
    };
  }
}
