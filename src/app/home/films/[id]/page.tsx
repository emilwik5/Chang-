"use client";
import { getMovieById } from "@/app/lib/search";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Movie } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);

  const moviepath = parseInt(usePathname().split("/")[3]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieData = await getMovieById(moviepath);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    }

    fetchMovie();
  }, [moviepath]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">{movie?.title}</h1>
      <div className="flex align-items-center justify-center w-full mt-2 text-slate-500">
        <h2 className="mr-4 justify-self-end">{movie?.releaseDate} </h2>
        <p className="">Runtime: {movie?.runtime} min</p>
      </div>
      <p className="font-semibold mt-2">{movie?.tagline}</p>
      <p className="max-w-screen-sm mt-10">{movie?.overview}</p>
    </div>
  );
}
