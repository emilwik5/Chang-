"use server";

import prisma from "@/lib/prisma";

export async function getMovies(query: string) {
  try {
    const q = query.split(" ").join(" | ");

    const result = await prisma.movie.findMany({
      where: {
        title: {
          search: q,
        },
      },
      orderBy: {
        _relevance: {
          fields: ["title"],
          search: q,
          sort: "desc",
        },
      },
    });

    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
