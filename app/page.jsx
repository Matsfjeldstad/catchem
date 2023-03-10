'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line import/no-unresolved
import { checkSession } from 'utils/auth';
import logo from '../public/catchem-logo.svg';

/**
 * React component that renders the buttons for users who are not logged in.
 * @returns {React.ReactNode} The rendered component.
 */
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

/**
 * React component that renders the button for users who are logged in.
 * @returns {React.ReactNode} The rendered component.
 */
function LoggedInButtons() {
  return (
    <Link href="/app" className="w-full">
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
  // State hook that stores whether the user is logged in.
  const [logedIn, setLogedIn] = useState(false);

  /**
   * Asynchronous function that checks if the user has a valid session.
   * Sets the `logedIn` state based on the result.
   * @returns {Promise<void>}
   */
  async function getProfile() {
    const session = await checkSession();

    if (session) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);

  /**
   * Boolean value indicating whether the user is logged in.
   * @type {boolean}
   */
  const auth = logedIn;

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
          {auth ? <LoggedInButtons /> : <LoggedOutButtons />}
        </div>
      </section>
    </main>
  );
}
