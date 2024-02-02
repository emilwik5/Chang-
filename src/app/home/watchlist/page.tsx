"use client";

import {
  addToWatchlist,
  getWatchedlist,
  removeFromWatchlist,
} from "@/app/actions";
import MovieCard from "@/components/movie-card";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  async function onAddToWatchlist(movie: Movie) {
    const res = await addToWatchlist(movie.id);
    if (res) setWatchlist([...watchlist, movie]);
  }

  async function onRemoveFromWatchlist(movie: Movie) {
    const res = await removeFromWatchlist(movie.id);
    if (res) setWatchlist(watchlist.filter((f) => f.id !== movie.id));
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
        {watchlist.map((m) => (
          <MovieCard
            movie={m}
            watchlisted={true}
            onAddToWatchlist={onAddToWatchlist}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            key={m.id}
          />
        ))}
      </div>
    </>
  );
}
