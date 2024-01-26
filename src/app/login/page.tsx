"use client";

import Link from "next/link";
import { loginUser } from "../actions";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState = {
  message: "",
};

export default function Page() {
  const [state, formAction] = useFormState(loginUser, initialState);

  return (
    <>
      <h2 className="m-2">Login</h2>
      <form action={formAction} className="flex flex-col space-y-2">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <div>
          <Button type="submit">Login</Button>

          <Link className="text-sm ml-5" href="/create-account">
            Not a member?
          </Link>
        </div>
        {state.message && (
          <Card className="border border-red-500/40 bg-red-500/20">
            <CardHeader>
              <CardDescription>{state.message}</CardDescription>
            </CardHeader>
          </Card>
        )}
      </form>
    </>
  );
}
