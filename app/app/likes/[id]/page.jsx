/* eslint-disable react/prop-types */

'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import BackArrow from 'public/icons/backarrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DateTime } from 'luxon';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { supabase } from '@/lib/supabaseClient';

function PokemonStats({ pokemonObject }) {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold">{pokemonObject.pokemon_name}</h3>
      <p className="">
        Type:
        {pokemonObject.pokemon_name}
      </p>
      <p className="">
        Pokemon Id:
        {pokemonObject.pokedex_id}
      </p>
      <p>
        You liked this Pokemon:
        <span className=" font-bold">
          {DateTime.fromISO(pokemonObject.created_at).toFormat('ff')}
        </span>
      </p>
    </div>
  );
}

function PokemonDetails({ pokemonObject }) {
  return (
    <>
      <Image
        src={pokemonObject.image_url}
        alt={pokemonObject.pokemon_name}
        width={250}
        height={250}
      />
      <h4 className="font-bold">
        Lvl.
        {pokemonObject.pokemon_level}
      </h4>
      <h1 className="text-2xl font-black uppercase sm:text-4xl ">
        {pokemonObject.pokemon_name}
      </h1>
      <q className="max-w-xl text-sm">{pokemonObject.chuck_joke}</q>
    </>
  );
}

export default function Page({ params }) {
  const [pokemonObject, setPokemonObject] = useState({});
  const router = useRouter();
  const { id } = params;

  async function getPokemonDetails() {
    const { data, error } = await supabase
      .from('your_liked_pokemon')
      .select('*')
      .eq('id', id);
    if (data && !error) {
      setPokemonObject(data[0]);
    }
  }
  useEffect(() => {
    getPokemonDetails();
  }, []);

  return (
    <main className="h-full w-full">
      <section className="relative flex h-[80vh] w-full flex-col justify-between bg-jungleHero p-6 text-white after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-gradient-to-t after:from-darkGray">
        <button
          onClick={() => {
            router.back();
          }}
          type="button"
          className="relative z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white opacity-60 backdrop-blur-sm duration-200 hover:scale-110 "
        >
          <Image src={BackArrow} alt="back" className="h-4 w-4" />
        </button>
        <div
          id="pokemonDetails"
          className=" z-30 flex w-full flex-col items-center gap-3 text-center"
        >
          {' '}
          {pokemonObject.pokemon_name ? (
            <PokemonDetails pokemonObject={pokemonObject} />
          ) : (
            'loading'
          )}
        </div>
      </section>
      {pokemonObject.pokemon_name ? (
        <PokemonStats pokemonObject={pokemonObject} />
      ) : (
        'loading'
      )}
      {/* <PokemonStats pokemonObject={pokemonObject} /> */}
    </main>
  );
}
