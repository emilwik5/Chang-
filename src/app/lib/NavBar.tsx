"use client";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavbarComponent() {
  return (
    <>
      <div className="flex items-center justify-between h-full px-10">
        <Link href="/home">
          <Image
            className="mb-4"
            src="\Chang.svg"
            width={140}
            height={140}
            alt="chang"
          ></Image>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent aria-label="Static Actions" className="p-2">
            <DropdownMenuItem>
              <Link href="/home/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/films">Films</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/news">News</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/watchlist">Watchlist</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
