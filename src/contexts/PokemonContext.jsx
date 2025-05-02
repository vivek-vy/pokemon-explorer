import React, { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext(null);

const PokemonProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState("id");
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    const exists = favorites.find((fav) => fav.id === pokemon.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const addToCompare = (pokemon) => {
    if (compareList.find((p) => p.id === pokemon.id)) return;
    if (compareList.length >= 2) return;
    setCompareList([...compareList, pokemon]);
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((p) => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <PokemonContext.Provider
      value={{
        favorites,
        toggleFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        itemsPerPage,
        setItemsPerPage,
        sortOption,
        setSortOption,
        selectedTypes,
        setSelectedTypes,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
