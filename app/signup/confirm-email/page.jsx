import React from 'react';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import pokeball from 'public/pokeball.svg';

export default function FourOhFour() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden text-[#2F2F2F]">
      <Image src="/pokeball.svg" width={40} height={50} alt="pokeball" />
      <h3 className="text-5xl font-black">Verify Your Email!</h3>
      <h1 className="max-w-md text-center">
        Almost there! We sent you a verification email. You need to verify to be
        able to use <span className=" font-medium italic">CatchEm</span>. Please
        check your email!
      </h1>
      <Image
        className="absolute -bottom-32 -right-32 w-[350px] -rotate-12 opacity-20 "
        src={pokeball}
        alt="pokeball"
      />
    </main>
  );
}
