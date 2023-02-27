import React from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

export default function NavLinks({ open }) {
  NavLinks.propTypes = {
    open: PropTypes.bool.isRequired,
  };
  const auth = true;
  return (
    <div
      className={`${
        open ? 'animate-bg-in' : 'animate-bg-out'
      } z-50 flex h-full w-screen flex-col gap-8 bg-darkGray p-4 text-offWhite duration-300`}
    >
      <Link
        href="/"
        className={` ${
          open ? 'animate-fade-in' : 'animate-fade-out'
        } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
      >
        Home
      </Link>
      <Link
        href={auth ? '/app' : '/login'}
        className={` ${
          open ? 'animate-fade-in' : ''
        } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
      >
        {auth ? 'Your likes' : 'login'}
      </Link>
      <Link
        href={auth ? '/' : '/login'}
        className={` ${
          open ? 'animate-fade-in' : ''
        }  w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
      >
        {auth ? 'sign out' : 'Sign up'}
      </Link>
    </div>
  );
}
