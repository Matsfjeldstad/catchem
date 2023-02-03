import Link from "next/link";

export default function NavLinks({ open }) {
  return (
    <div
      className={`${
        open ? "animate-bg-in" : "animate-bg-out"
      } flex h-full w-full flex-col gap-8 bg-darkGray p-6 text-offWhite duration-300`}
    >
      <Link
        onClick={() => setOpen(!open)}
        href="/login"
        className={` ${
          open ? "animate-fade-in" : "animate-fade-out"
        } text-7xl font-bold uppercase transition-transform hover:translate-x-2`}
      >
        Home
      </Link>
      <Link
        href="/login"
        className={` ${
          open ? "animate-fade-in" : ""
        } text-7xl font-bold uppercase transition-transform hover:translate-x-2`}
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={` ${
          open ? "animate-fade-in" : "animation-fade-out"
        } text-7xl font-bold uppercase transition-transform hover:translate-x-2`}
      >
        Signup
      </Link>
    </div>
  );
}
