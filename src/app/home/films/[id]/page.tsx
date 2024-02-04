import Image from "next/image";
import { getMovieById } from "@/app/lib/search";
import { getMoviePosterUrl } from "@/app/actions";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const movieId = parseInt(params.id);
  const movie = await getMovieById(movieId);
  const movieUrl = await getMoviePosterUrl(movieId);

  return (
    <div className="w-full flex space-x-10">
      <div className="border border-white rounded-md">
        {movieUrl ? (
          <div>
            {movieUrl.length > 0 ? (
              <Image
                className="rounded-md"
                src={`https://image.tmdb.org/t/p/original${movieUrl}`}
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
      <div>
        <h1 className="text-5xl font-bold justify-self-start">
          {movie?.title}
        </h1>

        <div className="flex align-items-center w-full mt-2 text-slate-500">
          <h2 className="mr-4 justify-self-end">{movie?.releaseDate} </h2>
          <p className="">Runtime: {movie?.runtime} min</p>
        </div>
        <p className="font-semibold mt-2">{movie?.tagline}</p>
        <p className="max-w-screen-sm mt-10">{movie?.overview}</p>
      </div>
    </div>
  );
}
