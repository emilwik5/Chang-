"use client";

import { getMovies } from "@/app/lib/search";
import { useState } from "react";
import { Movie } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const res = await getMovies(query);

      setMovies(res);
    }
  }
  return (
    <div className="mx-auto max-w-6xl container pb-12">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-64">
          <h1 className="m-2">Movie Search</h1>
          <Input
            type="moviename"
            name="moviename"
            placeholder="Enter movie here"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          ></Input>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5 px-10">
        {movies.map((movie) => (
          <Card key={movie.id}>
            <CardHeader className="flex gap-3">
              <CardTitle>{movie.title}</CardTitle>
              <CardDescription>{movie.overview}</CardDescription>
              <div className="flex flex-col">
                <p className="text-md"></p>
                <p className="text-small text-default-500"></p>
              </div>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <p>{movie.releaseDate}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
