import NavBar from "@/components/nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-start items-center mt-10">
        <div>{children}</div>
      </div>
    </>
  );
}
