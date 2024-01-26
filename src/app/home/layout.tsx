import NavbarChang from "@/app/lib/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarChang></NavbarChang>
      <div className="flex flex-col justify-start items-center mt-10">
        <div>{children}</div>
      </div>
    </>
  );
}
