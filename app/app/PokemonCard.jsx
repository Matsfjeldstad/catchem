/* eslint-disable import/no-unresolved */

'use client';

import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import Heart from 'public/icons/heart.svg';
import Cross from 'public/icons/cross.svg';

export default function PokemonCard() {
  const [animateState, setAnimateState] = useState('j');
  const [apiObject, setApiObject] = useState({});
  const [pokemonName, setPokemonName] = useState('Mew');
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonIMG, setPokemonIMG] = useState(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png',
  );
  const [chuckJoke, setChuckJoke] = useState(
    "Chuck Norris will roundhouse kick you to death if you laugh at Chuck Norris jokes. He will also roundhouse kick you to death if you don't laugh at Chuck Norris jokes. The choice is yours.",
  );
  const [count, setCount] = useState(Math.floor(Math.random() * 152));

  async function getCardDetails() {
    try {
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${count}/`,
      );
      const pokemonResponse = await pokemonData.json();
      // console.log(pokemonResponse);

      const chuckNorrisData = await fetch(
        `https://api.chucknorris.io/jokes/search?query=${pokemonResponse.types[0].type.name}`,
      );
      const chuckNorrisResponse = await chuckNorrisData.json();

      const randomJokeArray = Math.floor(
        Math.random() * chuckNorrisResponse.total,
      );
      const fallbackJoke =
        "Chuck Norris will roundhouse kick you to death if you laugh at Chuck Norris jokes. He will also roundhouse kick you to death if you don't laugh at Chuck Norris jokes. The choice is yours";

      // console.log(
      //   chuckNorrisResponse.total > 0
      //     ? chuckNorrisResponse.result[randomJokeArray].value
      //     : fallbackJoke
      // );
      const currentPokemonName = pokemonResponse.name;

      const chuckJoke =
        chuckNorrisResponse.total > 0
          ? chuckNorrisResponse.result[randomJokeArray].value
          : fallbackJoke;
      const currentPokemonId = pokemonResponse.id;
      const pokemonFirstName = faker.name.firstName();
      const currentPokemonIMG =
        pokemonResponse.sprites.other.home.front_default;

      setPokemonName(`${pokemonFirstName} the ${currentPokemonName}`);
      setPokemonIMG(currentPokemonIMG);
      setChuckJoke(chuckJoke);
      setPokemonId(currentPokemonId);
      setTimeout(() => {
        setAnimateState('animate-card-incoming');
      }, 100);

      setApiObject({
        firstName: pokemonFirstName,
        pokemon: currentPokemonName,
        avatar: currentPokemonIMG,
        joke: chuckJoke,
      });

      return apiObject;
    } catch (e) {
      return e;
    }
  }

  return (
    <div
      className={`relative flex h-full max-h-[600px] w-full duration-200 ${
        animateState || 'opacity-0'
      } justify-center overflow-hidden rounded-3xl bg-jungleHero p-6 text-center after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-darkGray md:w-[500px]`}
    >
      <div className="z-30 flex h-full flex-col items-center justify-end gap-5">
        <Link href={`app/likes/${pokemonId}`}>
          <Image
            width={240}
            height={240}
            src={pokemonIMG}
            alt={pokemonName}
            className="w-60"
          />
        </Link>
        <h4 className="text-3xl  font-black uppercase text-white">
          {pokemonName}
        </h4>
        <q className=" w-full text-sm text-offWhite/75 ">{chuckJoke}</q>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={async () => {
              setAnimateState('animate-card-dislike');
              setCount(Math.floor(Math.random() * 151) + 1);
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
              setCount(Math.floor(Math.random() * 152));
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
