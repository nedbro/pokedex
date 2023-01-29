import React, { useEffect, useState } from "react";
import "./App.css";
import { PokemonCard } from "./components/pokemon-card/PokemonCard";
import { Pokemon } from "pokenode-ts";
import axios, { AxiosResponse } from "axios";
import { SearchBar } from "./components/search-bar/SearchBar";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchedName, setSearchedName] = useState<string>("");

  useEffect(() => {
    if (searchedName.trim().length > 2) {
      const getPokemons = setTimeout(() => {
        axios
          .get(`http://localhost:8000/api/pokemons?name=${searchedName}`)
          .then((response: AxiosResponse<Pokemon[]>) => {
            if (response.data.length > 0) {
              setPokemons(response.data);
            } else {
              setPokemons([]);
            }
          });
      }, 2000);

      return () => clearTimeout(getPokemons);
    }
  }, [searchedName]);

  return (
    <div className="App">
      <SearchBar
        inputValue={searchedName}
        setInputValue={setSearchedName}
      ></SearchBar>
      {pokemons ? (
        <div className="pokemonContainer">
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}></PokemonCard>
          ))}{" "}
        </div>
      ) : null}
    </div>
  );
}

export default App;
