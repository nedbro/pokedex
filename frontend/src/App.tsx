import React, { useEffect, useState } from "react";
import "./App.css";
import { PokemonCard } from "./components/pokemon-card/PokemonCard";
import { Pokemon } from "pokenode-ts";
import axios, { AxiosResponse } from "axios";

function App() {
  const [testPokemon, setTestPokemon]: [Pokemon | undefined, Function] =
    useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pokemons?name=pikachu")
      .then((response: AxiosResponse<Pokemon[]>) => {
        if (response.data.length > 0) {
          setTestPokemon(response.data[0]);
        }
      });
  }, []);

  return (
    <div className="App">
      {testPokemon ? <PokemonCard pokemon={testPokemon}></PokemonCard> : null}
    </div>
  );
}

export default App;
