export default function Button({
  type,
}: {
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      className="h-10 w-20 bg-white rounded-md m-1 solid border-2 border-black-200 text-black"
    >
      Ok
    </button>
  );
}
