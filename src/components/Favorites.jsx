import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="favorite-item">
              <Link to={`/pokemon/${pokemon.id}`}>
                <img src={pokemon.image} alt={pokemon.name} className="favorite-img" />
                <h3>{pokemon.name.toUpperCase()}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
