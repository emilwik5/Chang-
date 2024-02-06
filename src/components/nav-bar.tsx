import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between h-16 px-10 bg-red-900">
        <Link href="/home">
          <Image
            className="mb-4"
            src="\Chang.svg"
            width={140}
            height={140}
            alt="chang"
          ></Image>
          <h1 className="absolute font-extrabold text-2xl -mt-14 ml-24">
            CHANG
          </h1>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent aria-label="Static Actions" className="p-2">
            <DropdownMenuItem>
              <Link href="/home/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/movies/search/test">Films</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/news">News</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/watchlist">Watchlist</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/home/add-movie">Add movie</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
