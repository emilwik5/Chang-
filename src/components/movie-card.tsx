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
import { Clock } from "lucide-react";
import Link from "next/link";

export default function MovieCard({
  movie,
  watchlisted,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}: {
  movie: Movie;
  watchlisted: boolean;
  onAddToWatchlist: (movie: Movie) => Promise<void>;
  onRemoveFromWatchlist: (movie: Movie) => Promise<void>;
}) {
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
          <Link href={`/home/films/${movie.id}`}>
            <p>{movie.title}</p>
          </Link>
          <p className="text-sm text-slate-500 mt-2">
            {movie.releaseDate.split("-")[0]}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className=" h-56 overflow-y-auto">
        {movie.overview}
      </CardContent>
    </Card>
  );
}
