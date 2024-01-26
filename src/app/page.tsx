import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-content p-24">
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-bold text-inherit">Chang</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/create-account"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </main>
  );
}
