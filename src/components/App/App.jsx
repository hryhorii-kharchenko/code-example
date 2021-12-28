import React, { useCallback, useEffect, useReducer } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Main from "../Main/Main";
import Favorites from "../Favorites/Favorites";
import ErrorBanner from "../ErrorBanner/ErrorBanner";
import Popup from "../Popup/Popup";
import Character from "../Character/Character";

import { fetchEntityCurried } from "../../api/entities";
import {
  CHARACTERS_ENDPOINT,
  MOVIES_ENDPOINT,
  SPACESHIPS_ENDPOINT,
  SPECIES_ENDPOINT,
} from "../../constants/endpoints";
import {
  ENTITIES,
  HAS_LOADED_ENTITIES,
  LIST_ID_SEPARATOR,
} from "../../constants/entities";
import { LOCAL_STORAGE_KEYS } from "../../constants/storage";
import {
  addFavoriteCharacter,
  characterLoadSuccess,
  closePopup,
  entityLoadFail,
  fillCharacterData,
  moviesLoadSuccess,
  removeFavoriteCharacter,
  selectCharacter,
  setFavoriteCharacters,
  spaceshipsLoadSuccess,
  speciesLoadSuccess,
  updateEntity,
} from "./reducer/actions";
import { appReducer, initialAppState } from "./reducer/reducer";
import styles from "./App.module.scss";

function removeListIdFromDraggableId(draggableId) {
  const listIdIndex = draggableId.indexOf(LIST_ID_SEPARATOR);
  return draggableId.slice(listIdIndex + LIST_ID_SEPARATOR.length);
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState, appReducer);

  useEffect(function loadEntities() {
    try {
      const persistedFavoriteCharactersJson = localStorage.getItem(
        LOCAL_STORAGE_KEYS.FAVORITE_CHARACTERS
      );

      if (persistedFavoriteCharactersJson) {
        const persistedFavoriteCharacters = JSON.parse(
          persistedFavoriteCharactersJson
        );

        if (persistedFavoriteCharacters) {
          dispatch(setFavoriteCharacters(persistedFavoriteCharacters));
        }
      }
    } catch (error) {
      console.log(`Error getting stored favorite characters: ${error}`);
    }

    Promise.all([
      updateEntity(
        dispatch,
        fetchEntityCurried(CHARACTERS_ENDPOINT),
        characterLoadSuccess,
        entityLoadFail
      ),
      updateEntity(
        dispatch,
        fetchEntityCurried(SPECIES_ENDPOINT),
        speciesLoadSuccess,
        entityLoadFail
      ),
      updateEntity(
        dispatch,
        fetchEntityCurried(MOVIES_ENDPOINT),
        moviesLoadSuccess,
        entityLoadFail
      ),
      updateEntity(
        dispatch,
        fetchEntityCurried(SPACESHIPS_ENDPOINT),
        spaceshipsLoadSuccess,
        entityLoadFail
      ),
    ])
      .then(function handleAllEntitiesLoaded() {
        dispatch(fillCharacterData());
      })
      .catch(console.log);
  }, []);

  useEffect(
    function persistFavoriteCharacters() {
      if (Array.isArray(state.favoriteCharactersIds)) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.FAVORITE_CHARACTERS,
          JSON.stringify(state.favoriteCharactersIds)
        );
      }
    },
    [state.favoriteCharactersIds]
  );

  const selectCharacterCallback = useCallback(function selectCharacterCallback(
    characterId
  ) {
    dispatch(selectCharacter(characterId));
  },
  []);

  const closePopupCallback = useCallback(function closePopupCallback() {
    dispatch(closePopup());
  }, []);

  let selectedCharacterJsx = null;

  if (state.selectedCharacterId) {
    const selectedCharacter = state.characters.find(
      function doesCharacterIdMatch(character) {
        return character.id === state.selectedCharacterId;
      }
    );

    if (selectedCharacter) {
      selectedCharacterJsx = (
        <Character
          isOpen
          id={selectedCharacter.id}
          name={selectedCharacter.name}
          spaceships={selectedCharacter.spaceships}
          movies={selectedCharacter.movies}
          species={selectedCharacter.species}
          openCharacterById={selectCharacterCallback}
        />
      );
    }
  }

  const hasLoadedCharacters = state[HAS_LOADED_ENTITIES.CHARACTERS];
  const hasLoadedAuxiliary =
    state[HAS_LOADED_ENTITIES.MOVIES] &&
    state[HAS_LOADED_ENTITIES.SPECIES] &&
    state[HAS_LOADED_ENTITIES.SPACESHIPS];

  const onDragEnd = useCallback(function onDragEnd(result) {
    if (result.destination && result.destination.droppableId === "favorites") {
      dispatch(
        addFavoriteCharacter(
          removeListIdFromDraggableId(result.draggableId),
          result.destination.index
        )
      );
    } else if (
      result.destination &&
      result.destination.droppableId === "main" &&
      result.source.droppableId === "favorites"
    ) {
      dispatch(
        removeFavoriteCharacter(removeListIdFromDraggableId(result.draggableId))
      );
    }
  }, []);

  return (
    <>
      <div className={styles.app}>
        <h1 className={styles.title}>Star Wars Code Example</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <Main
            characters={state[ENTITIES.CHARACTERS]}
            speciesOptions={state[ENTITIES.SPECIES]}
            movieOptions={state[ENTITIES.MOVIES]}
            openCharacterById={selectCharacterCallback}
            hasLoadedCharacters={hasLoadedCharacters}
            hasLoadedFilters={hasLoadedAuxiliary}
          />
          <Favorites
            characters={state[ENTITIES.CHARACTERS]}
            favoriteCharactersIds={state.favoriteCharactersIds}
            openCharacterById={selectCharacterCallback}
            hasLoadedCharacters={hasLoadedCharacters}
          />
        </DragDropContext>
      </div>
      <ErrorBanner isActive={state.isConnectionError} />
      <Popup
        isOpen={state.isPopupOpen}
        closePopup={closePopupCallback}
        hasLoadedCompletely={hasLoadedCharacters && hasLoadedAuxiliary}
      >
        {selectedCharacterJsx}
      </Popup>
    </>
  );
}

export default App;
