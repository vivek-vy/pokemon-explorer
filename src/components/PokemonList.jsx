import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import useFetchPokemonList from "../hooks/useFetchPokemonList";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { itemsPerPage, setItemsPerPage, sortOption, setSortOption } = useContext(PokemonContext);
  const [page, setPage] = useState(1);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const offset = (page - 1) * itemsPerPage;

  const { pokemonList, loading } = useFetchPokemonList(itemsPerPage, offset);

  // Fetch types from API on mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        const data = await res.json();
        setTypes(data.results.map((t) => t.name));
      } catch (err) {
        console.error("Failed to load types", err);
      }
    };
    fetchTypes();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const sortedList = [...pokemonList]
    .sort((a, b) => {
      if (sortOption === "id") return a.id - b.id;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    })
    .filter((pokemon) => {
      if (selectedTypes.length === 0) return true;
      return pokemon.types.some((t) => selectedTypes.includes(t.type.name));
    });

  return (
    <div>
      <div className="controls">
        <label>
          Items per page :{' '}
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>

        <label>
          Sort by :{" "}
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="type-filter">
        <h4>Filter by Type:</h4>
        <div className="type-options">
          {types.map((type) => (
            <button
              key={type}
              className={`type-option ${selectedTypes.includes(type) ? "selected" : ""}`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <div className="pokemon-grid">
          {sortedList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
