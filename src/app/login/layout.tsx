export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <div>{children}</div>
    </div>
  );
}
