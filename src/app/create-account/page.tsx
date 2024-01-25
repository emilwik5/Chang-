import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";
import { redirect } from "next/navigation";
import { Divider } from "@nextui-org/react";

export default function Page() {
  async function createAccount(formData: FormData) {
    "use server";

    const { username, email, pw, confirmPw } = {
      username: formData.get("username"),
      email: formData.get("email"),
      pw: formData.get("password"),
      confirmPw: formData.get("confirm-password"),
    };

    if (!email || !username || !pw || !confirmPw || pw !== confirmPw) {
      console.log("Form data incorrect.");
      return;
    }

    try {
      const exists = await prisma.user.findFirst({
        where: {
          email: email.toString(),
        },
      });

      if (exists) {
        console.log("User already signed up");
        return;
      }

      const pwHash = await argon2.hash(pw.toString());
      await prisma.user.create({
        data: {
          email: email.toString(),
          username: username.toString(),
          password: pwHash,
        },
      });
    } catch (error) {
      console.error(error);
    }

    redirect("/login");
  }

  return (
    <>
      <h2 className="m-2">Create Account</h2>
      <form action={createAccount} className="flex flex-col space-y-2">
        <Input placeholder="Username" name="username" size="sm" />
        <Input placeholder="Email" name="email" size="sm" />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          size="sm"
        />
        <Input
          placeholder="Confirm Password"
          name="confirm-password"
          type="password"
          size="sm"
        />
        <Divider />
        <div>
          <Button type="submit">Create account</Button>
          <Link className="text-sm ml-5" href="/login">
            Back to login
          </Link>
        </div>
      </form>
    </>
  );
}
