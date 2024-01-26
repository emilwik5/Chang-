import NavbarChang from "@/app/lib/nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarChang></NavbarChang>
      <div className="flex h-screen flex-col justify-start items-center mt-10">
        <div>{children}</div>
      </div>
    </>
  );
}
