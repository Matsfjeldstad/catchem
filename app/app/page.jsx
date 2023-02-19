import React from 'react';
import PokemonCard from './PokemonCard';

export default function page() {
  return (
    <main className=" flex h-[calc(100vh_-_80px)] w-full items-center justify-center p-4">
      <PokemonCard />
    </main>
  );
}
