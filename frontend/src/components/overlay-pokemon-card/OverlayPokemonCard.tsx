import { Pokemon } from 'pokenode-ts';
import styles from './OverlayPokemonCard.module.scss';
import HeartFull from './../../icons/heartFull.svg';
import Close from './../../icons/close.svg';
import Female from './../../icons/female.svg';
import Male from './../../icons/male.svg';

export function OverlayPokemonCard({
  pokemon,
  searchedName,
}: {
  pokemon: Pokemon;
  searchedName?: string;
}) {
  const type = pokemon.types[0].type.name;
  const hp =
    pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0;
  const attack =
    pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? 0;
  const defense =
    pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? 0;
  const speed =
    pokemon.stats.find((stat) => stat.stat.name === 'speed')?.base_stat ?? 0;

  const backImage = pokemon.sprites.back_default;
  const frontImage = pokemon.sprites.front_default;

  const defaultImageSrc =
    'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/0.png?raw=true';

  return (
    <div className={styles.overlayPokemonCard}>
      <div className={styles.topRow}>
        <b className={styles.capitalize}>{pokemon.name}</b>
        <img src={HeartFull} alt="asd" />
        <img src={Close} alt="asd" className={styles.paddingRight10} />
      </div>
      <p className={styles.type}>{type}</p>

      <div className={styles.contentContainer}>
        <div className={styles.contentColumn}>
          <div className={styles.statContainer}>
            <div className={`${styles.textPair} ${styles.marginBottom10}`}>
              <p className={`${styles.paddingLeft4} ${styles.marginRight35}`}>
                Hp {hp}
              </p>
              <p className={styles.paddingRight4}>Atk {attack}</p>
            </div>
            <div className={`${styles.textPair}`}>
              <p className={`${styles.paddingLeft4} ${styles.marginRight35}`}>
                Def {defense}
              </p>
              <p className={styles.paddingRight4}>Sp {speed}</p>
            </div>
          </div>

          <div>
            <img src={Female} alt="female icon" />
            <img src={Male} alt="male icon" />
          </div>

          <div>
            <b>Back</b>
            <b>Front</b>
          </div>
        </div>

        <img
          src={pokemon.sprites.front_default ?? defaultImageSrc}
          alt="default sprite"
          className={`${styles.imageContainer} ${styles.marginBottom10}`}
        />
      </div>
    </div>
  );
}
