import Input from "../ui/Input";
import Link from "next/link";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export default function Page() {
  async function login(formData: FormData) {
    "use server";

    const { email, pw } = {
      email: formData.get("email"),
      pw: formData.get("password"),
    };

    const user = await prisma.user.findFirst({
      where: {
        email: email?.toString(),
      },
    });

    if (!user) {
      console.log("No user with that email exists.");
      return;
    }

    const verified = await argon2.verify(user.password, pw?.toString()!);

    if (!verified) {
      console.error("Invalid credentials");
      return;
    }

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
  }

  return (
    <>
      <h2 className="m-2">Login</h2>
      <form action={login}>
        <Input placeholder="Email" name="email" />
        <Input placeholder="Password" name="password" type="password" />
        <button
          type="submit"
          className="h-10 w-20 bg-white rounded-md m-1 solid border-2 border-black-200 text-black"
        >
          Login
        </button>
        <Link className="text-sm ml-5" href="/create-account">
          Not a member?
        </Link>
      </form>
    </>
  );
}
