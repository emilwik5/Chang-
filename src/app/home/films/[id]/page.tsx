"use client";
import Image from "next/image";
import { getMovieById } from "@/app/lib/search";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Movie } from "@prisma/client";

export default function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieImage, setMovieImage] = useState<any>(null);

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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzY4OWJlZDM5OTJlNWU0YTAwNDA2OGM0ZjA0NDcwYyIsInN1YiI6IjY1YjdkOWFkNWUxNGU1MDBjN2FkMDhhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.irt9bfkFxLdmDqImJ7p7wkys7_GI4ZA3x5gXwtm1aOU",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${movie?.id}?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((data) => setMovieImage(data))
    .catch((err) => console.error(err));

  return (
    <div className="w-full flex flex-col -ml-24">
      <h1 className="text-5xl font-bold justify-self-start">{movie?.title}</h1>

      <div className="flex align-items-center w-full mt-2 text-slate-500">
        <h2 className="mr-4 justify-self-end">{movie?.releaseDate} </h2>
        <p className="">Runtime: {movie?.runtime} min</p>
      </div>
      <p className="font-semibold mt-2">{movie?.tagline}</p>
      <p className="max-w-screen-sm mt-10">{movie?.overview}</p>
      <div className="absolute -left-8 ml-32 top-24 border border-white rounded-md">
        {movieImage ? (
          <div>
            {movieImage.poster_path && movieImage.poster_path.length > 0 ? (
              <Image
                className="rounded-md"
                src={`https://image.tmdb.org/t/p/original${movieImage.poster_path}`}
                alt="Movie Poster"
                width={400}
                height={600}
              />
            ) : (
              <p>No images available</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
