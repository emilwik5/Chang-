"use server";

import { SignJWT } from "jose";
import { handleLogin, userFromToken } from "./lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

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
