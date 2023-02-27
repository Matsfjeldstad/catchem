/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';
import LikedCards from './LikedCards';

export default function page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className=" flex h-full w-full flex-col gap-10 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold">Your liked Pokemons!</h1>
        <p className="text-lg">Here is a list of all your liked pokemons</p>
      </div>
      <LikedCards />
    </main>
  );
}
