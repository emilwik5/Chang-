"use client";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { profile } from "console";

export default function NavbarChang() {
  return (
    <Navbar className="bg-red-950">
      <div className="flex items-center h-full">
        <Image
          className="mb-4"
          src="\Chang.svg"
          width={140}
          height={140}
          alt="chang"
        ></Image>
        <Button
          href="/home"
          className="bg-transparent font-extrabold text-xl -ml-12"
        >
          CHANG
        </Button>
      </div>
      <NavbarItem>
        <div className="flex items-center">
          <Button className="bg-transparent"></Button>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="faded" className="bg-black">
                Menu
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="p-2">
              <DropdownItem href="/home/profile">Profile</DropdownItem>
              <DropdownItem href="/home/films">Films</DropdownItem>
              <DropdownItem href="/home/watchlist">Watchlist</DropdownItem>
              <DropdownItem href="/home/news">News</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarItem>
    </Navbar>
  );
}
