import Input from "@/app/ui/Input";
import Link from "next/link";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import { redirect } from "next/navigation";

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
      <form action={createAccount}>
        <Input placeholder="Username" name="username" />
        <Input placeholder="Email" name="email" />
        <Input placeholder="Password" name="password" type="password" />
        <Input
          placeholder="Confirm Password"
          name="confirm-password"
          type="password"
        />
        <button
          type="submit"
          className="h-10 w-full bg-white rounded-md m-1 solid border-2 border-black-200 text-black"
        >
          Create account
        </button>
        <Link className="text-sm ml-5" href="/login">
          Back to login
        </Link>
      </form>
    </>
  );
}
