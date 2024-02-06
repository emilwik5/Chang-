import { getWatchedlist } from "@/app/actions";
import MovieGrid from "@/components/movie-grid";

export default async function Page() {
  const watchlist = await getWatchedlist();
  return (
    <>
      <MovieGrid movies={watchlist!}></MovieGrid>
    </>
  );
}
