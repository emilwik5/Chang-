"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Movie } from "@prisma/client";
import { TmdbMovieResult, getTmdbMovies, importFromTmdb } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, RefreshCcw } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [movies, setMovies] = useState<TmdbMovieResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const res = await getTmdbMovies(query);
      if (res) setMovies(res);
    }
  }

  async function addMovie(movieId: number) {
    setLoading(true);
    try {
      const res = await importFromTmdb(movieId);

      if (res) setMovies(movies.filter((f) => f.id !== res.id));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  return (
    <div className="mx-auto max-w-6xl container pb-12">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-64">
          <Input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie"
          ></Input>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5 px-10">
          {movies.map((movie) => (
            <Card className="flex flex-col" key={movie.id}>
              <CardHeader className="flex gap-3 ">
                <CardTitle>
                  <p>{movie.title}</p>
                  {movie.title !== movie.originalTitle && (
                    <div className="mt-2">
                      <p className="text-xs">Original Title: </p>
                      <p className="text-sm">{movie.originalTitle}</p>
                    </div>
                  )}

                  <p className="text-sm text-slate-500 mt-2">
                    {movie.releaseDate.split("-")[0]}
                  </p>
                </CardTitle>
                <CardDescription>
                  {movie.posterPath && movie.posterPath.length > 0 ? (
                    <Image
                      className="rounded-md w-auto h-auto"
                      src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
                      alt="Movie Poster"
                      width={200}
                      height={450}
                    />
                  ) : (
                    "No poster available"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 overflow-y-auto">
                {movie.overview}
              </CardContent>
              <CardFooter className="flex-1 flex flex-col justify-end">
                <Button
                  onClick={() => addMovie(movie.id)}
                  type="button"
                  className="w-full"
                  disabled={loading}
                >
                  {!loading ? (
                    <PlusIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
