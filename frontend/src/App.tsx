import React, { MouseEventHandler, useEffect, useState } from 'react';
import './App.scss';
import { PokemonCard } from './components/pokemon-card/PokemonCard';
import { Pokemon } from 'pokenode-ts';
import axios, { AxiosResponse } from 'axios';
import { SearchBar } from './components/search-bar/SearchBar';
import { Modal } from 'react-overlays';
import { OverlayPokemonCard } from './components/overlay-pokemon-card/OverlayPokemonCard';
import { RenderModalBackdropProps } from 'react-overlays/cjs/Modal';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchedName, setSearchedName] = useState<string>('');
  const [showPokemonModal, setShowPokemonModal] = useState(false);

  const handleClose = () => setShowPokemonModal(false);

  const handleSave = () => {
    console.log('success');
  };

  const renderBackdrop = (props: RenderModalBackdropProps) => (
    <div className="backdrop" {...props} />
  );

  useEffect(() => {
    if (searchedName.trim().length > 2) {
      const getPokemons = setTimeout(() => {
        axios
          .get(`http://localhost:8000/api/pokemons?name=${searchedName}`)
          .then((response: AxiosResponse<Pokemon[]>) => {
            if (response.data.length > 0) {
              setPokemons(response.data);
              setShowPokemonModal(true);
            } else {
              setPokemons([]);
            }
          });
      }, 1000);

      return () => clearTimeout(getPokemons);
    }
  }, [searchedName]);

  return (
    <div className="App">
      <SearchBar
        inputValue={searchedName}
        setInputValue={setSearchedName}
      ></SearchBar>

      <Modal
        className="modal"
        show={showPokemonModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <OverlayPokemonCard pokemon={pokemons[0]}></OverlayPokemonCard>
      </Modal>
      {pokemons ? (
        <div className="pokemonContainer">
          {pokemons.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.id}
              searchedName={searchedName}
              onClick={() => setShowPokemonModal(true)}
            ></PokemonCard>
          ))}{' '}
        </div>
      ) : null}
    </div>
  );
}

export default App;
