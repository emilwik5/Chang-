"use client";

import { getMovies } from "@/app/lib/search";
import { useState, useEffect } from "react";
import { Movie } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  addToWatchlist,
  getWatchedlist,
  removeFromWatchlist,
} from "@/app/actions";
import MovieCard from "@/components/movie-card";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const [query, setQuery] = useState("");

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const res = await getMovies(query);

      setMovies(res);
    }
  }

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
          <MovieCard
            movie={movie}
            watchlisted={watchlist.find((f) => f.id === movie.id) !== undefined}
            onAddToWatchlist={onAddToWatchlist}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
}
