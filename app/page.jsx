import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/catchem-logo.svg';

function LoggedOutButtons() {
  return (
    <div className="flex w-full gap-3">
      <Link href="/login" className="w-full">
        <button
          type="button"
          className="w-full max-w-sm rounded-full bg-offWhite px-6 py-3 text-darkGray duration-200 hover:scale-105 disabled:bg-gray-500"
        >
          Login
        </button>
      </Link>
      <Link href="/signup" className="w-full">
        <button
          type="button"
          className="w-full max-w-sm rounded-full border-2 border-offWhite px-6 py-3 text-offWhite backdrop-blur duration-200 hover:scale-105 disabled:bg-gray-500"
        >
          Signup
        </button>
      </Link>
    </div>
  );
}

function LoggedInButtons() {
  return (
    <Link href="/" className="w-full">
      <button
        type="button"
        className="w-full rounded-full bg-offWhite px-6 py-3 text-darkGray duration-200 hover:scale-105 disabled:bg-gray-500"
      >
        Launch App
      </button>
    </Link>
  );
}
export default function Home() {
  const logdin = true;

  return (
    <main className="w-full lg:w-[calc(100vw_-_120px)]">
      <section className=" relative flex h-[calc(100vh_-_80px)] w-full items-center justify-center bg-jungleHero p-6 after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/70 lg:h-screen">
        <div className="relative z-30 flex h-full w-full max-w-lg flex-col items-center justify-center gap-10">
          <Image src={logo} alt="logo" className="w-32 lg:w-40" />
          <h1 className="text-center text-5xl font-black uppercase text-white lg:text-8xl">
            Catch Em All
          </h1>
          <h2 className="text-center text-xl font-normal text-white">
            The Ultimate Pokemon Experience
          </h2>
          {logdin ? <LoggedInButtons /> : <LoggedOutButtons />}
        </div>
      </section>
    </main>
  );
}
