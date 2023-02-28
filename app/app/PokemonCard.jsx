/* eslint-disable import/no-unresolved */

'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import Heart from 'public/icons/heart.svg';
import Cross from 'public/icons/cross.svg';
import { supabase } from 'lib/supabaseClient';

export default function PokemonCard() {
  const [animateState, setAnimateState] = useState(true);
  const [pokemonObject, setPokemonObject] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getCardDetails();
  }, []);

  async function getCardDetails() {
    try {
      const count = Math.floor(Math.random() * 151) + 1;
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${count}/`,
      );
      const pokemonResponse = await pokemonData.json();

      const chuckNorrisData = await fetch(
        `https://api.chucknorris.io/jokes/search?query=${
          pokemonResponse.types[0]?.type?.name ?? ''
        }`,
      );
      const chuckNorrisResponse = await chuckNorrisData.json();

      const randomJokeArray = Math.floor(
        Math.random() * chuckNorrisResponse.total,
      );
      const fallbackJoke =
        "Chuck Norris will roundhouse kick you to death if you laugh at Chuck Norris jokes. He will also roundhouse kick you to death if you don't laugh at Chuck Norris jokes. The choice is yours";

      const currentPokemonName = pokemonResponse.name;

      const currentChuckJoke =
        chuckNorrisResponse.total > 0
          ? chuckNorrisResponse.result[randomJokeArray].value
          : fallbackJoke;
      const currentPokemonId = pokemonResponse.id;
      const pokemonFirstName = faker.name.firstName();
      const currentPokemonIMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${count}.png`;

      setPokemonObject({
        firstName: pokemonFirstName,
        pokemon: currentPokemonName,
        avatar: currentPokemonIMG,
        joke: currentChuckJoke,
        pokedex_id: currentPokemonId,
      });
      setTimeout(() => {
        setAnimateState('animate-card-incoming');
      }, 100);

      return pokemonObject;
    } catch (e) {
      return e;
    }
  }

  async function likePokemon() {
    // gets user and user_id from super base
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userID = user.identities[0].user_id;

    const { error } = await supabase.from('your_liked_pokemon').insert({
      pokemon_name: `${pokemonObject.firstName} the ${pokemonObject.pokemon}`,
      image_url: pokemonObject.avatar,
      pokedex_id: pokemonObject.pokedex_id,
      chuck_joke: pokemonObject.joke,
      user_id: userID,
    });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <div
      className={`relative flex h-full max-h-[600px] w-full duration-200 ${
        animateState || 'opacity-0'
      } justify-center overflow-hidden rounded-3xl bg-jungleHero p-6 text-center after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-darkGray md:w-[500px]`}
    >
      <div className="z-30 flex h-full flex-col items-center justify-end gap-5">
        <Link href={`app/likes/${pokemonObject.pokedex_id}`}>
          <Image
            width={240}
            height={240}
            src={pokemonObject.avatar}
            alt={pokemonObject.pokemon}
            className="w-60"
          />
        </Link>
        <h4 className="text-3xl  font-black uppercase text-white">
          {`${pokemonObject.firstName} the ${pokemonObject.pokemon}`}
        </h4>
        <q className=" w-full text-sm text-offWhite/75 ">
          {pokemonObject.joke}
        </q>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={async () => {
              setAnimateState('animate-card-dislike');
              setTimeout(async () => {
                setAnimateState('opacity-0');
                await getCardDetails();
              }, 400);
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-redish/30 text-white duration-200 hover:scale-105"
          >
            <Image src={Cross} alt="dislike" width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              setAnimateState('animate-card-like');
              likePokemon();
              setTimeout(async () => {
                setAnimateState('opacity-0');
                await getCardDetails();
              }, 400);
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-offWhite/25 text-white duration-200 hover:scale-105"
          >
            <Image src={Heart} alt="heart" width={20} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
