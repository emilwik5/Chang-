import NavbarComponent from "@/app/lib/NavBar";
import NavbarChang from "@/app/lib/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <div className="flex flex-col justify-start items-center mt-10">
        <div>{children}</div>
      </div>
    </>
  );
}
