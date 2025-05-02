import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();
   const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load Pokémon details", err);
        setLoading(false);
      }
    };
    fetchPokemonDetail();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = () => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((fav) => fav.id === pokemon.id);

    if (index === -1) {
      updatedFavorites.push(pokemon);
    } else {
      updatedFavorites.splice(index, 1);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) return <p>Loading Pokémon details...</p>;

  if (!pokemon) return <p>Pokémon not found!</p>;

  return (
    <div className="pokemon-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="pokemon-info">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-img" />
        <h1>{pokemon.name.toUpperCase()}</h1>
        <button
          className="favorite-btn"
          onClick={toggleFavorite}
        >
          {favorites.some((fav) => fav.id === pokemon.id) ? "Unfavorite" : "Favorite"}
        </button>
        <div className="pokemon-stats">
          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div className="pokemon-abilities">
          <h3>Abilities</h3>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
