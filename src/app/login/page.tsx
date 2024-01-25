"use client";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Input, Card, CardBody } from "@nextui-org/react";
import { loginUser } from "../actions";
import { useFormState } from "react-dom";

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
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <Input
          type="password"
          label="Password"
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
          <Card>
            <CardBody>
              <p>{state.message}</p>
            </CardBody>
          </Card>
        )}
      </form>
    </>
  );
}
