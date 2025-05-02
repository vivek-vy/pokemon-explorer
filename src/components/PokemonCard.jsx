import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../contexts/PokemonContext";

const PokemonCard = ({ pokemon }) => {
  const { toggleFavorite, favorites } = useContext(PokemonContext);
  const isFav = favorites.some((p) => p.id === pokemon.id);

  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>ID: #{pokemon.id}</p>
      <div className="types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type-badge ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="card-actions">
        <Link to={`/pokemon/${pokemon.id}`} className="view-btn">View</Link>
        <button onClick={() => toggleFavorite(pokemon)} className="fav-btn">
          {isFav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
