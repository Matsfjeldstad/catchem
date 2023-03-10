'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../public/catchem-logo.svg';
import NavLinks from './NavLinks';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex h-[80px] w-full items-center justify-between bg-darkGray py-4 px-3 lg:h-screen lg:w-[120px] lg:flex-col">
      <button
        type="button"
        id="hamburger"
        onClick={() => setOpen(!open)}
        className="flex h-7 w-fit cursor-pointer items-center gap-1.5"
      >
        <div
          className={`relative h-1 w-8 bg-offWhite duration-200 ${
            open
              ? ' rotate-45 before:top-0  before:rotate-90 after:opacity-0'
              : 'before:-top-2'
          } before:absolute before:left-0 before:h-1 before:w-8 before:bg-offWhite before:duration-200 after:absolute after:top-2 after:left-0 after:h-1 after:w-8 after:bg-offWhite`}
        />
      </button>
      <div
        className={`${
          open ? 'flex' : 'hidden'
        } fixed top-20 left-0 z-50 h-[calc(100vh_-_80px)] w-screen lg:top-0 lg:left-[112px] lg:h-screen lg:w-[calc(100vw_-_112px)]`}
      >
        <NavLinks className="w-full" open={open} />
      </div>
      <Link href="/" className="h-full w-fit lg:h-fit">
        <Image src={logo} alt="logo" className="h-full w-fit" />
      </Link>
    </nav>
  );
}
