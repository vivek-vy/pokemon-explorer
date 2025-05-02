import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import ListView from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import Favorites from "./components/Favorites";
import Comparison from "./components/Comparison";
import RandomPokemon from "./components/RandomPokemon";
import "./assets/style.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="titlelogo">Pokemon Explorer</div>
          <div className="icons">
            <Link className="link" to="/">
              Home
            </Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/compare">Compare</Link>
            <Link to="/random">Random Pokémon</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Comparison />} />
          <Route path="/random" element={<RandomPokemon />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
