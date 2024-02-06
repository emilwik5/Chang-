"use client";
import { useState, useEffect } from "react";
import MovieCard from "./movie-card";
import { Movie } from "@prisma/client";
import {
  addToWatchlist,
  getWatchedlist,
  removeFromWatchlist,
} from "@/app/actions";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  async function onAddToWatchlist(movie: Movie) {
    setWatchlist([...watchlist, movie]);
    const res = await addToWatchlist(movie.id);
  }

  async function onRemoveFromWatchlist(movie: Movie) {
    setWatchlist(watchlist.filter((f) => f.id !== movie.id));
    const res = await removeFromWatchlist(movie.id);
  }
  useEffect(() => {
    const getWatchlistFn = async () => {
      const res = await getWatchedlist();
      if (res) setWatchlist(res);
    };

    getWatchlistFn();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-5 px-10">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            watchlisted={watchlist.find((f) => f.id === movie.id) !== undefined}
            onAddToWatchlist={onAddToWatchlist}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            key={movie.id}
          />
        ))}
      </div>
    </>
  );
}
