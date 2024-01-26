import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-content p-24">
      <p className="font-bold text-inherit">Chang</p>

      <Link href="/login">Login</Link>
      <Link href="/create-account">
        <Button color="primary">Sign Up</Button>
      </Link>
    </main>
  );
}
