import React from "react";
import PropTypes from "prop-types";

import { Draggable } from "react-beautiful-dnd";
import styles from "./Character.module.scss";
import { LIST_ID_SEPARATOR } from "../../constants/entities";

function Character({
  listId,
  id,
  name,
  species,
  movies,
  spaceships,
  openCharacterById,
  isOpen,
  index,
}) {
  function openCharacterByIdCallback() {
    openCharacterById(id);
  }

  const speciesStr = species.join(", ");
  const moviesStr = movies.join(", ");
  const spaceshipsStr = spaceships.join(", ");

  const speciesJsx = speciesStr ? (
    <p className={styles.detail}>
      <strong>Species: </strong>
      {speciesStr}
    </p>
  ) : null;
  const moviesJsx = moviesStr ? (
    <p className={styles.detail}>
      <strong>Movies: </strong>
      {moviesStr}
    </p>
  ) : null;
  const spaceshipsJsx = spaceshipsStr ? (
    <p className={styles.detail}>
      <strong>Spaceships: </strong>
      {spaceshipsStr}
    </p>
  ) : null;

  const infoJsx = (
    <div className={styles.details}>
      <p className={styles.detail}>
        <strong>Name: </strong>
        {name}
      </p>
      {speciesJsx}
      {moviesJsx}
      {spaceshipsJsx}
    </div>
  );

  const characterContentJsx = <h3 className={styles.name}>{name}</h3>;

  const draggableId = `${listId}${LIST_ID_SEPARATOR}${id}`;

  const characterJsx = isOpen ? (
    <li className={`${styles.character} ${styles.isOpen}`}>
      {characterContentJsx}
      {infoJsx}
    </li>
  ) : (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <li
          onClick={openCharacterByIdCallback}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.character}
        >
          {characterContentJsx}
        </li>
      )}
    </Draggable>
  );

  return characterJsx;
}

Character.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.arrayOf(PropTypes.string).isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  spaceships: PropTypes.arrayOf(PropTypes.string).isRequired,
  openCharacterById: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  index: PropTypes.number,
  listId: PropTypes.string,
};

Character.defaultProps = {
  isOpen: false,
  index: 0,
  listId: "",
};

export default Character;
