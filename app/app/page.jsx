/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';
import PokemonCard from './PokemonCard';
import RegionDropdown from './RegionDropdown';

export default function page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className=" flex w-full flex-col items-center justify-center overflow-hidden p-4">
      <RegionDropdown />
      <PokemonCard />
    </main>
  );
}
