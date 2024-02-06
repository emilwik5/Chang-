"use client";

import { Movie } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Clock, PopcornIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { addReview, getMoviePosterUrl } from "@/app/actions";
import { clsx } from "clsx";

export default function MovieCard({
  movie,
  watchlisted,
  rating,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  onSetRating,
}: {
  movie: Movie;
  watchlisted: boolean;
  rating?: number;
  onAddToWatchlist: (movie: Movie) => Promise<void>;
  onRemoveFromWatchlist: (movie: Movie) => Promise<void>;
  onSetRating: (rating: number, movieId: number) => Promise<void>;
}) {
  const [posterPath, setPosterPath] = useState<string>();
  const [hoverScore, setHoverScore] = useState<number>();

  useEffect(() => {
    const getUrl = async () => {
      const poster = await getMoviePosterUrl(movie.id);

      if (poster) setPosterPath(poster);
    };

    getUrl();
  }, []);
  return (
    <Card className="relative" key={movie.id}>
      <div className="absolute right-0 p-2">
        {!watchlisted ? (
          <Button
            onClick={() => onAddToWatchlist(movie)}
            variant="ghost"
            size="icon"
          >
            <Clock className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => onRemoveFromWatchlist(movie)}
            variant="ghost"
            size="icon"
          >
            <Clock className="h-4 w-4 text-green-400" />
          </Button>
        )}
      </div>
      <CardHeader className="flex gap-3 mt-4">
        <CardTitle>
          <Link href={`/home/movie/${movie.id}`}>
            <p>{movie.title}</p>
          </Link>
          <p className="text-sm text-slate-500 mt-2">
            {movie.releaseDate.split("-")[0]}
          </p>
          <div className="flex justify-between h-4">
            <div className="flex">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                <PopcornIcon
                  key={s}
                  onMouseOver={() => setHoverScore(s)}
                  onMouseLeave={() => setHoverScore(undefined)}
                  className={clsx(
                    "h-5 w-5 cursor-pointer",
                    hoverScore && s <= hoverScore && "text-red-500",
                    rating && s <= rating && !hoverScore && "text-red-500"
                  )}
                  onClick={() => onSetRating(s, movie.id)}
                ></PopcornIcon>
              ))}
            </div>

            {hoverScore && <p className="text-sm">{hoverScore} / 10</p>}
          </div>
        </CardTitle>
        <CardDescription>
          {posterPath && posterPath.length > 0 ? (
            <Image
              className="rounded-md w-auto h-auto"
              src={`https://image.tmdb.org/t/p/original${posterPath}`}
              alt="Movie Poster"
              width={200}
              height={450}
            />
          ) : (
            "No poster available"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className=" h-56 overflow-y-auto">
        {movie.overview}
      </CardContent>
    </Card>
  );
}
