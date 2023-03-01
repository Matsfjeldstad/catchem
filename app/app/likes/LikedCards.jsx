import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';

export default function LikedCards() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  /**
  Retrieves data from the "your_liked_pokemon" table in Supabase.
  @async
  @function getObject
  @returns {Promise<void>} Promise object representing the retrieved data or error message
  */
  async function getObject() {
    const { data, error } = await supabase
      .from('your_liked_pokemon')
      .select('*');

    if (error) {
      console.error(error.message);
    } else {
      if (data.length > 0) {
        setTableData(data);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    getObject();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (tableData.length < 1) {
    return <div> You have no likes</div>;
  }

  // }
  return (
    <div className="flex flex-col gap-6 text-white md:grid md:grid-cols-2 lg:grid-cols-3">
      {tableData.map((row) => (
        <Link
          href={`/app/likes/${row.id}`}
          key={row.id}
          className="relative flex h-full min-h-fit w-full items-end justify-center overflow-hidden rounded-3xl bg-jungleHero bg-cover p-6 text-center duration-200 after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-darkGray hover:scale-105"
        >
          <div className="z-30 flex flex-col items-center justify-center gap-4">
            <Image
              src={row.image_url}
              alt={row.pokedex_id}
              width={140}
              height={140}
            />
            <h3 className="text-xl font-bold capitalize">{row.pokemon_name}</h3>
            <button
              type="button"
              className="relative z-20 rounded-full border-2 px-6 py-2 text-white duration-200"
            >
              Check stats
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
