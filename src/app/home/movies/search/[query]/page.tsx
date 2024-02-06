import { getMovies } from "@/app/lib/search";
import { Input } from "@/components/ui/input";
import MovieGrid from "@/components/movie-grid";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { query: string } }) {
  const movies = await getMovies(decodeURIComponent(params.query));
  async function search(formData: FormData) {
    "use server";

    const query = formData.get("query")!.toString();
    redirect(`/home/movies/search/${encodeURIComponent(query)}`);
  }
  return (
    <div className="mx-auto max-w-6xl container pb-12">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-64">
          <h1 className="m-2">Movie Search</h1>
          <form action={search}>
            <Input
              type="text"
              name="query"
              placeholder="Enter movie here"
              required
            ></Input>
            <Input type="submit" className="hidden"></Input>
          </form>
        </div>
      </div>
      {movies.length ? (
        <MovieGrid movies={movies}></MovieGrid>
      ) : (
        <div className="m-12 text-3xl">No movies found!</div>
      )}
    </div>
  );
}
