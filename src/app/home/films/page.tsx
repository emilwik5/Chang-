"use client";

import { getFilm } from "@/app/lib/search";
import { useSearchParams } from "next/navigation";
import { Input, Card, CardBody } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { Button } from "@nextui-org/react";
import NavbarChang from "@/app/lib/nav-bar";
const initialState = {
  message: "",
};

export default function Page() {
  const [state, formAction] = useFormState(getFilm, initialState);
  return (
    <>
      <h1 className="m-2">Movie Search</h1>

      <form action={formAction} className="w-60">
        <Input
          type="moviename"
          name="moviename"
          placeholder="Enter movie here"
          required
        ></Input>
        <Button type="submit" className="mt-2">
          Search
        </Button>
      </form>
    </>
  );
}
