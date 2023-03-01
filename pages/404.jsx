import React from 'react';
import '../app/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import pokeball from '../public/pokeball.svg';

export default function FourOhFour() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center gap-6 overflow-hidden p-4 text-[#2F2F2F]">
      <h1 className="flex items-center gap-2 text-9xl font-bold text-[#2F2F2F]">
        4
        <span>
          <Image src="/pokeball.svg" width={96} height={50} alt="pokeball" />
        </span>
        4
      </h1>
      <h2 className="">
        Oh no, we could not find the page you are looking for...
      </h2>
      <Link
        href="/"
        className="text-lg font-medium underline duration-200 hover:scale-110 "
      >
        Go back home
      </Link>
      <Image
        className="absolute -bottom-32 -right-32 w-[350px] -rotate-12 opacity-20 "
        src={pokeball}
        alt="pokeball"
      />
    </main>
  );
}
