/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { checkSession } from '@/utils/auth';

export default function NavLinks({ open }) {
  const router = useRouter();
  const [logedIn, setLogedIn] = useState(false);
  const [authState, setAuthState] = useState('SIGNED_OUT');

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getProfile();
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') setAuthState('SIGNED_OUT');
      if (event === 'SIGNED_IN') setAuthState('SIGNED_IN');
    });
  }, [authState]);

  async function getProfile() {
    const session = await checkSession();
    if (session) {
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
      {auth ? (
        <Link
          href="/app"
          className={` ${
            open ? 'animate-fade-in' : 'animate-fade-out'
          } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
        >
          app
        </Link>
      ) : (
        ''
      )}

      <Link
        href={auth ? '/app/likes' : '/login'}
        className={` ${
          open ? 'animate-fade-in' : ''
        } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
      >
        {auth ? 'Your likes' : 'Log in'}
      </Link>
      {auth ? (
        <button
          className={` ${
            open ? 'animate-fade-in' : ''
          } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
          type="button"
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            setLogedIn(false);
            if (!error) {
              router.push('/');
              router.refresh();
            }
          }}
        >
          Log out
        </button>
      ) : (
        <Link
          className={` ${
            open ? 'animate-fade-in' : ''
          } w-fit text-5xl font-bold uppercase transition-transform hover:translate-x-2 lg:text-7xl`}
          href="/signup"
        >
          {' '}
          Sign up
        </Link>
      )}
    </div>
  );
}
