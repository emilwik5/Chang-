export default function Input({ placeholder }: { placeholder: string }) {
  
    return (
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="input" className="sr-only">
          Input
        </label>
        <input
          className="peer block w-30 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black m-1"
          placeholder={placeholder}
        />
      </div>
    );
  }
  