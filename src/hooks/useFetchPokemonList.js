import { useEffect, useState } from "react";

const useFetchPokemonList = (limit, offset) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPokemonData = async (results) => {
    const promises = results.map((p) => fetch(p.url).then((res) => res.json()));
    return Promise.all(promises);
  };

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();
        const fullData = await getAllPokemonData(data.results);
        setPokemonList(fullData);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [limit, offset]);

  return { pokemonList, loading };
};

export default useFetchPokemonList;
