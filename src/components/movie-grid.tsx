"use client";
import { useState, useEffect } from "react";
import MovieCard from "./movie-card";
import { Movie } from "@prisma/client";
import {
  addReview,
  addToWatchlist,
  getRatings,
  getWatchedlist,
  removeFromWatchlist,
} from "@/app/actions";
import { Skeleton } from "./ui/skeleton";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [ratings, setRatings] =
    useState<{ movieId: number; rating: number }[]>();

  const [loadingData, setLoadingData] = useState(true);

  async function onAddToWatchlist(movie: Movie) {
    setWatchlist([...watchlist, movie]);
    const res = await addToWatchlist(movie.id);
  }

  async function onRemoveFromWatchlist(movie: Movie) {
    setWatchlist(watchlist.filter((f) => f.id !== movie.id));
    const res = await removeFromWatchlist(movie.id);
  }

  async function onSetRating(rating: number, movieId: number) {
    const updated = ratings?.map((m) => {
      if (m.movieId === movieId) {
        return {
          ...m,
          rating: rating,
        };
      }

      return m;
    });
    setRatings(updated);
    const res = await addReview(rating, movieId);
  }

  useEffect(() => {
    const getData = async () => {
      const watchlistRes = await getWatchedlist();
      if (watchlistRes) setWatchlist(watchlistRes);
      const ratingsRes = await getRatings(movies.map((m) => m.id));
      if (ratingsRes) setRatings(ratingsRes);

      setLoadingData(false);
    };

    getData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-5 px-10">
        {loadingData ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[400px] w-[250px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                rating={ratings?.find((f) => f.movieId === movie.id)?.rating}
                watchlisted={
                  watchlist.find((f) => f.id === movie.id) !== undefined
                }
                onAddToWatchlist={onAddToWatchlist}
                onRemoveFromWatchlist={onRemoveFromWatchlist}
                onSetRating={onSetRating}
                key={movie.id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
