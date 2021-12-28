import React from "react";
import PropTypes from "prop-types";

import CharacterList from "../CharacterList/CharacterList";

import styles from "./Favorites.module.scss";
import Progress from "../Progress/Progress";

function Favorites({
  characters,
  favoriteCharactersIds,
  openCharacterById,
  hasLoadedCharacters,
}) {
  const favoriteCharacters = [];

  for (const favoriteCharacterId of favoriteCharactersIds) {
    const favoriteCharacter = characters.find(
      function getDoesCharacterIdMatchFavoriteCharacterId(character) {
        return character.id === favoriteCharacterId;
      }
    );

    favoriteCharacters.push(favoriteCharacter);
  }

  const characterListJsx = hasLoadedCharacters ? (
    <CharacterList
      listId="favorites"
      characters={favoriteCharacters}
      openCharacterById={openCharacterById}
      hasLoadedCharacters={hasLoadedCharacters}
      emptyMessage="Drag your favorite characters here!"
    />
  ) : (
    <Progress />
  );

  return (
    <aside className={styles.favorites}>
      <h2 className={styles.title}>Favorites</h2>
      {characterListJsx}
    </aside>
  );
}

Favorites.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.arrayOf(PropTypes.string).isRequired,
      movies: PropTypes.arrayOf(PropTypes.string).isRequired,
      spaceships: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  favoriteCharactersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  openCharacterById: PropTypes.func.isRequired,
  hasLoadedCharacters: PropTypes.bool.isRequired,
};

export default Favorites;
