import { Pokemon } from 'pokenode-ts';
import styles from './PokemonCard.module.scss';

export function PokemonCard({
  pokemon,
  searchedName,
  onClick,
}: {
  pokemon: Pokemon;
  searchedName?: string;
  onClick?: () => void;
}): JSX.Element {
  const type = pokemon.types[0].type.name;
  const hp =
    pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0;
  const attack =
    pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? 0;
  const defense =
    pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? 0;
  const speed =
    pokemon.stats.find((stat) => stat.stat.name === 'speed')?.base_stat ?? 0;

  const defaultImageSrc =
    'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/0.png?raw=true';

  return (
    <div
      className={styles.pokemonCard}
      onClick={() => (onClick ? onClick() : undefined)}
    >
      <div className={`${styles.imageContainer} ${styles.marginBottom10}`}>
        <img
          src={pokemon.sprites.front_default ?? defaultImageSrc}
          alt="default sprite"
        ></img>
      </div>

      <div className={styles.statContainer}>
        <div className={`${styles.textPair} ${styles.marginBottom15}`}>
          <p
            className={`${styles.overflowWrapAnywhere} ${styles.capitalize}`}
          >
            
              {searchedName && pokemon.name.includes(searchedName) ? (
                <>
                  <b>{searchedName ?? null}</b>
                  {pokemon.name.replace(searchedName, '')}
                </>
              ) : (
                <>{pokemon.name}</>
              )}
            </p>
            <p className="type">{type}</p>
        </div>

        <div className={`${styles.textPair} ${styles.marginBottom10}`}>
          <p className={styles.paddingLeft4}>Hp {hp}</p>
          <p className={styles.paddingRight4}>Atk {attack}</p>
        </div>
        <div
          className={`${styles.textPair}`}
        >
          <p className={styles.paddingLeft4}>Def {defense}</p>
          <p className={styles.paddingRight4}>Sp {speed}</p>
        </div>
      </div>
    </div>
  );
}
