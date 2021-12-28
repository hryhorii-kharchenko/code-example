import React from "react";
import PropTypes from "prop-types";

import { Droppable } from "react-beautiful-dnd";
import Character from "../Character/Character";
import styles from "./CharacterList.module.scss";
import Progress from "../Progress/Progress";

function CharacterList({
  listId,
  characters,
  openCharacterById,
  hasLoadedCharacters,
  emptyMessage,
}) {
  const progressJsx = !hasLoadedCharacters ? <Progress /> : null;

  let charactersJsx = null;
  let emptyMessageJsx = null;

  if (characters.length > 0) {
    charactersJsx = characters.map(function getCharacterJsx(
      { id, name, species, movies, spaceships },
      index
    ) {
      return (
        <Character
          id={id}
          name={name}
          species={species}
          movies={movies}
          spaceships={spaceships}
          openCharacterById={openCharacterById}
          index={index}
          listId={listId}
          key={id}
        />
      );
    });
  } else if (hasLoadedCharacters) {
    emptyMessageJsx = <p className={styles.emptyMsg}>{emptyMessage}</p>;
  }

  return (
    <>
      <Droppable droppableId={listId}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.list}
          >
            {charactersJsx}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {emptyMessageJsx}
      {progressJsx}
    </>
  );
}

CharacterList.propTypes = {
  listId: PropTypes.string.isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.arrayOf(PropTypes.string).isRequired,
      movies: PropTypes.arrayOf(PropTypes.string).isRequired,
      spaceships: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  openCharacterById: PropTypes.func.isRequired,
  hasLoadedCharacters: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string,
};

CharacterList.defaultProps = {
  emptyMessage: "No characters chosen!",
};

export default CharacterList;
