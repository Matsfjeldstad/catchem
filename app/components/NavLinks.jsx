/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';
import PropTypes from 'prop-types';

export default function NavLinks({ open }) {
  const router = useRouter();
  const [loading, setLoading] = useState('');
  const [logedIn, setLogedIn] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }
  NavLinks.propTypes = {
    open: PropTypes.bool.isRequired,
  };

  const auth = logedIn;
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
      {auth ? (
        <button
          className={` ${
            open ? 'animate-fade-in' : ''
          } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
          type="button"
          onClick={async () => {
            setLoading('Loading...');
            const { error } = await supabase.auth.signOut();
            setLogedIn(false);
            // const { data } = await supabase.auth.getUser();
            // console.log(data);
            if (!error) {
              router.push('/');
            }
          }}
        >
          {loading || 'Log out'}
        </button>
      ) : (
        <Link
          className={` ${
            open ? 'animate-fade-in' : ''
          } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
          href="/signup"
        >
          {' '}
          Sign in
        </Link>
      )}
    </div>
  );
}
