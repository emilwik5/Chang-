"use server";

import prisma from "@/lib/prisma";
import { error } from "console";

export async function getFilm(prev: any, formData: FormData) {
  const moviename = formData.get("moviename");
  console.log(moviename);
  try {
    const result = await prisma.movie.findFirst({
      where: {
        title: moviename,
      },
    });
    if (result) {
      return result;
    } else {
      throw new Error("Movie with name not found");
    }
  } catch (e) {
    console.error("Error:", e.message);
    return { error: e.message };
  }
}
