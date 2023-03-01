/* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-unresolved */

'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import Heart from 'public/icons/heart.svg';
import Cross from 'public/icons/cross.svg';
import { supabase } from 'lib/supabaseClient';

async function getAllRegions() {
  try {
    const allRegionsData = await fetch(
      'https://pokeapi.co/api/v2/pokedex/?limit=30',
    );
    const allRegionsResponse = await allRegionsData.json();
    return allRegionsResponse.results;
  } catch (e) {
    alert(e);
    return e;
  }
}

export default function PokemonCard() {
  const [animateState, setAnimateState] = useState(true);
  const [pokemonObject, setPokemonObject] = useState({});
  const [pokedexes, setPokedexes] = useState([]);
  const [currentPokedex, setCurrentPokedex] = useState(
    'https://pokeapi.co/api/v2/pokedex/1/',
  );
  async function getCardDetails() {
    try {
      const pokedexData = await fetch(currentPokedex);
      const pokedexDataResponse = await pokedexData.json();
      // eslint-disable-next-line camelcase
      const { pokemon_entries } = pokedexDataResponse;
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${
          pokedexDataResponse.pokemon_entries[
            // eslint-disable-next-line camelcase
            Math.floor(Math.random() * pokemon_entries.length)
          ].pokemon_species.name
        }/`,
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
      const fallbackJoke = "Chuck Norris will roundhouse kick you to death if you laugh at Chuck Norris jokes. He will also roundhouse kick you to death if you don't laugh at Chuck Norris jokes. The choice is yours";

      const currentPokemonName = pokemonResponse.name;
      const currentPokemonType = pokemonResponse.types[0].type.name;
      const currentPokemonWeight = pokemonResponse.weight / 10;

      const currentChuckJoke = chuckNorrisResponse.total > 0
        ? chuckNorrisResponse.result[randomJokeArray].value
        : fallbackJoke;
      const currentPokemonId = pokemonResponse.id;
      const pokemonFirstName = faker.name.firstName();
      const currentPokemonIMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${currentPokemonId}.png`;

      setPokemonObject({
        firstName: pokemonFirstName,
        pokemon: currentPokemonName,
        pokemon_type: currentPokemonType,
        avatar: currentPokemonIMG,
        weight: currentPokemonWeight,
        joke: currentChuckJoke,
        pokedex_id: currentPokemonId,
        level: Math.floor(Math.random() * 99) + 1,
      });
      setTimeout(() => {
        setAnimateState('animate-card-incoming');
      }, 100);
      console.log('en');

      return pokemonObject;
    } catch (e) {
      return e;
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    async function fetchData() {
      const regionObjects = await getAllRegions();
      setPokedexes(regionObjects);
    }
    fetchData();
    getCardDetails();
  }, []);

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
      pokemon_level: pokemonObject.level,
      user_id: userID,
    });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <section className=" flex w-full flex-col justify-center gap-5 lg:flex-row">
      <div
        className={`relative flex h-full max-h-[600px] w-full duration-200 ${
          animateState || 'opacity-0'
        } justify-center overflow-hidden rounded-3xl bg-jungleHero p-6 text-center after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-darkGray md:w-[500px]`}
      >
        <div className="z-30 flex h-full flex-col items-center justify-end gap-5">
          <Image
            width={240}
            height={240}
            src={pokemonObject.avatar}
            alt={pokemonObject.pokemon}
            className="w-60"
          />
          <div className="font-black uppercase text-white">
            <div>
              lvl.
              {pokemonObject.level}
            </div>
            <h4 className="text-3xl  ">
              {`${pokemonObject.firstName} the ${pokemonObject.pokemon}`}
            </h4>
          </div>
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
      <div className="flex h-fit w-full max-w-md flex-col gap-3 rounded-3xl bg-gray-800 p-6 text-white">
        <div className="flex w-full flex-col gap-5">
          <h2 className="text-3xl font-bold">Settings</h2>
          <div className="flex flex-row items-center gap-3">
            <span className=" font-semibold">Pokedex:</span>
            <select
              className="w-full rounded-full border border-gray-200 bg-transparent p-1"
              onChange={async (event) => {
                setCurrentPokedex(event.target.value);
                console.log(currentPokedex);
                setAnimateState('opacity-0');
                await getCardDetails();
              }}
            >
              {pokedexes.map((pokedex) => (
                <option
                  className="bg-gray-800"
                  value={pokedex.url}
                  key={pokedex.url}
                >
                  {pokedex.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Stats</h2>
          <div>
            Level:
            {' '}
            <span>{pokemonObject.level}</span>
          </div>
          <div>
            {' '}
            Type:
            {' '}
            <span>{pokemonObject.pokemon_type}</span>
          </div>
          <div>
            {' '}
            Weight:
            {' '}
            <span>{pokemonObject.weight}</span>
            {' '}
            kg
          </div>
          <div>
            {' '}
            Pokemon Id: no.
            <span>{pokemonObject.pokedex_id}</span>
          </div>
        </div>
        <Link
          href="/app/likes"
          className="relative z-20 flex items-center justify-center gap-2 rounded-full border-2 bg-offWhite px-6 py-2 text-darkGray duration-200 hover:scale-105"
        >
          <Image src={Heart} alt="like" />
          {' '}
          Your liked Pokemon
        </Link>
      </div>
    </section>
  );
}
