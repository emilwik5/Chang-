"use server";

import { SignJWT } from "jose";
import { handleLogin, userFromToken } from "./lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import type { Movie } from "@prisma/client";

export async function loginUser(prev: any, formData: FormData) {
  const { email, pw } = {
    email: formData.get("email"),
    pw: formData.get("password"),
  };

  if (!email || !pw) {
    return {
      message: "Email or password not provided.",
    };
  }

  try {
    const user = await handleLogin(email.toString(), pw.toString());
    const signedJwt = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    cookies().set("accessToken", signedJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2,
      path: "/",
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Invalid credentials",
    };
  }

  redirect("/home");
}

export async function addToWatchlist(movieId: number) {
  const value = cookies().get("accessToken")?.value;

  try {
    const user = await userFromToken(value!);
    const res = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        watchlist: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function removeFromWatchlist(movieId: number) {
  const value = cookies().get("accessToken")?.value;

  try {
    const user = await userFromToken(value!);
    const res = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        watchlist: {
          disconnect: {
            id: movieId,
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getWatchedlist() {
  const value = cookies().get("accessToken")?.value;

  try {
    const user = await userFromToken(value!);
    const res = await prisma.user.findFirst({
      where: {
        id: user?.id,
      },
      include: {
        watchlist: true,
      },
    });

    return res?.watchlist;
  } catch (error) {
    console.error(error);
  }
}

export async function getMoviePosterUrl(movieId: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const posterUrl = (await res.json()).poster_path as string;

    return posterUrl;
  } catch (error) {
    console.error(error);
  }
}

export type TmdbMovieResult = Movie & {
  posterPath: string;
};

export async function getTmdbMovies(query: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const resJson = await res.json();

    const movies = resJson.results.map((m: any) => {
      return {
        id: m.id,
        originalTitle: m.original_title,
        overview: m.overview,
        popularity: m.popularity,
        releaseDate: m.release_date,
        title: m.title,
        posterPath: m.poster_path,
      };
    }) as TmdbMovieResult[];

    const existingMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: movies.map((m) => m.id),
        },
      },
    });
    if (existingMovies.length === 0) return movies;

    return movies.filter((f) => existingMovies.find((m) => m.id !== f.id));
  } catch (error) {
    console.error(error);
  }
}

export async function importFromTmdb(movieId: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    type Genre = {
      id: number;
      name: string;
    };

    type ProductionCompany = {
      id: number;
      name: string;
    };
    type TmdbMovie = {
      id: number;
      title: string;
      original_title: string;
      overview: string;
      popularity: number;
      release_date: string;
      runtime: number;
      tagline: string;
      genres: Genre[];
      production_companies: ProductionCompany[];
    };

    const tmdbMovie: TmdbMovie = await res.json();

    const movie = await prisma.movie.create({
      data: {
        id: tmdbMovie.id,
        originalTitle: tmdbMovie.original_title,
        overview: tmdbMovie.overview,
        popularity: tmdbMovie.popularity,
        releaseDate: tmdbMovie.release_date,
        runtime: tmdbMovie.runtime,
        tagline: tmdbMovie.tagline,
        title: tmdbMovie.title,
      },
    });

    const genres: Genre[] = tmdbMovie.genres;
    const production_companies: ProductionCompany[] =
      tmdbMovie.production_companies;

    genres.forEach(async (g) => {
      await prisma.genre.upsert({
        where: {
          id: g.id,
        },
        update: {
          movies: {
            connect: {
              id: movieId,
            },
          },
        },
        create: {
          id: g.id,
          name: g.name,
          movies: {
            connect: {
              id: movieId,
            },
          },
        },
      });
    });
    production_companies.forEach(async (p) => {
      await prisma.productionCompany.upsert({
        where: {
          id: p.id,
        },
        update: {
          movies: {
            connect: {
              id: movieId,
            },
          },
        },
        create: {
          id: p.id,
          name: p.name,
          movies: {
            connect: {
              id: movieId,
            },
          },
        },
      });
    });

    return movie;
  } catch (error) {
    console.error(error);
  }
}

export async function addReview(rating: number, movieId: number) {
  const value = cookies().get("accessToken")?.value;

  try {
    const user = await userFromToken(value!);

    const res = await prisma.movieReview.upsert({
      where: {
        userId_movieId: {
          movieId: movieId,
          userId: user?.id!,
        },
      },
      update: {
        rating: rating,
      },
      create: {
        rating: rating,
        userId: user?.id!,
        movieId: movieId,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getRatings(movieIds: number[]) {
  const value = cookies().get("accessToken")?.value;

  try {
    const user = await userFromToken(value!);

    const res = await prisma.movieReview.findMany({
      where: {
        userId: user?.id!,
        movieId: {
          in: movieIds,
        },
      },
      select: {
        movieId: true,
        rating: true,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}
