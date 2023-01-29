import { Pokemon } from "pokenode-ts";
import "./PokemonCard.css";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types[0].type.name;
  const hp =
    pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? 0;
  const attack =
    pokemon.stats.find((stat) => stat.stat.name === "attack")?.base_stat ?? 0;
  const defense =
    pokemon.stats.find((stat) => stat.stat.name === "defense")?.base_stat ?? 0;
  const speed =
    pokemon.stats.find((stat) => stat.stat.name === "speed")?.base_stat ?? 0;

  return (
    <div className="PokemonCard">
      <div className="imageContainer margin-bottom-10">
        <img
          src={pokemon.sprites.front_default ?? undefined}
          alt="default sprite"
        ></img>
      </div>

      <div className="statContainer">
        <div className="textPair margin-bottom-15">
          <p className="overflow-wrap-anywhere">{name}</p>
          <p className="type">{type}</p>
        </div>

        <div className="textPair margin-bottom-10">
          <p className="padding-left-4">Hp {hp}</p>
          <p className="padding-right-4">Atk {attack}</p>
        </div>
        <div className="textPair padding-side-4 ">
          <p className="padding-left-4">Def {defense}</p>
          <p className="padding-right-4">Sp {speed}</p>
        </div>
      </div>
    </div>
  );
}
