import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Comparison = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await res.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  const handleSelectPokemon = async (pokemon, slot) => {
    const res = await fetch(pokemon.url);
    const data = await res.json();

    if (slot === 1) {
      setSelectedPokemon1(data);
    } else {
      setSelectedPokemon2(data);
    }
  };

  return (
    <div className="comparison">
      <h1>Pokémon Comparison</h1>
      <div className="selection">
        <div className="select-pokemon">
          <h2>Select Pokémon 1</h2>
          <select
            onChange={(e) => handleSelectPokemon(pokemons[e.target.selectedIndex], 1)}
            defaultValue=""
          >
            <option value="">Select Pokémon</option>
            {pokemons.map((pokemon, index) => (
              <option key={index} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <div className="select-pokemon">
          <h2>Select Pokémon 2</h2>
          <select
            onChange={(e) => handleSelectPokemon(pokemons[e.target.selectedIndex], 2)}
            defaultValue=""
          >
            <option value="">Select Pokémon</option>
            {pokemons.map((pokemon, index) => (
              <option key={index} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPokemon1 && selectedPokemon2 && (
        <div className="comparison-result">
          <div className="pokemon-comparison">
            <div className="pokemon-card">
              <h3>{selectedPokemon1.name.toUpperCase()}</h3>
              <img src={selectedPokemon1.sprites.front_default} alt={selectedPokemon1.name} />
              <h4>Stats</h4>
              <ul>
                {selectedPokemon1.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="vs">
              <h2>VS</h2>
            </div>

            <div className="pokemon-card">
              <h3>{selectedPokemon2.name.toUpperCase()}</h3>
              <img src={selectedPokemon2.sprites.front_default} alt={selectedPokemon2.name} />
              <h4>Stats</h4>
              <ul>
                {selectedPokemon2.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comparison;
