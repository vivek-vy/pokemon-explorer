import React, { useState } from "react";

const RandomPokemon = () => {
  const [randomPokemon, setRandomPokemon] = useState(null);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // API has around 898 Pokémon
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();
    setRandomPokemon(data);
  };

  return (
    <div className="random-pokemon">
      <h1>Random Pokémon</h1>
      <button onClick={fetchRandomPokemon}>Get Random Pokémon</button>

      {randomPokemon && (
        <div className="pokemon-card">
          <h3>{randomPokemon.name.toUpperCase()}</h3>
          <img
            src={randomPokemon.sprites.front_default}
            alt={randomPokemon.name}
            className="pokemon-image"
          />
          <h4>Stats</h4>
          <ul>
            {randomPokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RandomPokemon;
