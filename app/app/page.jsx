/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-unresolved
import PokemonCard from './PokemonCard';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { checkSession } from '@/utils/auth';

export default function page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getProfile() {
    const session = checkSession();

    if (!session) {
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
    <main className=" flex w-full flex-col overflow-hidden p-4">
      <PokemonCard />
    </main>
  );
}
