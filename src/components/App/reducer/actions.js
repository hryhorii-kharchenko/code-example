import { ENTITIES } from "../../../constants/entities";

export const ACTION_TYPES = {
  ENTITY_LOAD_SUCCESS: "ENTITY_LOAD_SUCCESS",
  ENTITY_LOAD_FAIL: "ENTITY_LOAD_FAIL",
  FILL_CHARACTER_DATA: "FILL_CHARACTER_DATA",
  SET_FAVORITE_CHARACTERS: "SET_FAVORITE_CHARACTERS",
  ADD_FAVORITE_CHARACTER: "ADD_FAVORITE_CHARACTER",
  REMOVE_FAVORITE_CHARACTER: "REMOVE_FAVORITE_CHARACTER",
  SELECT_CHARACTER: "SELECT_CHARACTER",
  CLOSE_POPUP: "CLOSE_POPUP",
};

export function characterLoadSuccess(characters, hasFinishedLoading) {
  const formattedCharacters = characters.map(function getFormattedCharacter(
    character
  ) {
    return {
      id: character.url,
      name: character.name,
      birthYear: character.birth_year,
      species: [],
      speciesIds: character.species,
      movies: [],
      moviesIds: character.films,
      spaceships: [],
      spaceshipsIds: character.starships,
    };
  });

  return {
    type: ACTION_TYPES.ENTITY_LOAD_SUCCESS,
    payload: {
      entity: ENTITIES.CHARACTERS,
      values: formattedCharacters,
      hasFinishedLoading,
    },
  };
}

export function speciesLoadSuccess(species, hasFinishedLoading) {
  const formattedSpecies = species.map(function getFormattedSpecies(
    speciesElem
  ) {
    return {
      id: speciesElem.url,
      name: speciesElem.name,
    };
  });

  return {
    type: ACTION_TYPES.ENTITY_LOAD_SUCCESS,
    payload: {
      entity: ENTITIES.SPECIES,
      values: formattedSpecies,
      hasFinishedLoading,
    },
  };
}

export function moviesLoadSuccess(movies, hasFinishedLoading) {
  const formattedMovies = movies.map(function getFormattedMovie(movie) {
    return {
      id: movie.url,
      name: movie.title,
    };
  });

  return {
    type: ACTION_TYPES.ENTITY_LOAD_SUCCESS,
    payload: {
      entity: ENTITIES.MOVIES,
      values: formattedMovies,
      hasFinishedLoading,
    },
  };
}

export function spaceshipsLoadSuccess(spaceships, hasFinishedLoading) {
  const formattedSpaceships = spaceships.map(function getFormattedSpaceship(
    spaceship
  ) {
    return {
      id: spaceship.url,
      name: spaceship.name,
    };
  });

  return {
    type: ACTION_TYPES.ENTITY_LOAD_SUCCESS,
    payload: {
      entity: ENTITIES.SPACESHIPS,
      values: formattedSpaceships,
      hasFinishedLoading,
    },
  };
}

export function entityLoadFail() {
  return {
    type: ACTION_TYPES.ENTITY_LOAD_FAIL,
  };
}

export function fillCharacterData() {
  return { type: ACTION_TYPES.FILL_CHARACTER_DATA };
}

export function setFavoriteCharacters(newFavoriteCharactersIds) {
  return {
    type: ACTION_TYPES.SET_FAVORITE_CHARACTERS,
    payload: newFavoriteCharactersIds,
  };
}

export function addFavoriteCharacter(favoriteCharacterId, newIndex) {
  return {
    type: ACTION_TYPES.ADD_FAVORITE_CHARACTER,
    payload: { favoriteCharacterId, newIndex },
  };
}

export function removeFavoriteCharacter(favoriteCharacterId) {
  return {
    type: ACTION_TYPES.REMOVE_FAVORITE_CHARACTER,
    payload: favoriteCharacterId,
  };
}

export function selectCharacter(id) {
  return { type: ACTION_TYPES.SELECT_CHARACTER, payload: id };
}

export function closePopup() {
  return { type: ACTION_TYPES.CLOSE_POPUP };
}

export function updateEntity(
  dispatch,
  fetchFn,
  successActionCreator,
  failActionCreator
) {
  let page = 1;

  function updateEntityInner() {
    return fetchFn(page).then(function handleResult(result) {
      let resultingPromise;

      if (Array.isArray(result.results)) {
        dispatch(successActionCreator(result.results, !result.next));
      }

      if (result.next) {
        page += 1;
        resultingPromise = updateEntityInner();
      }

      return resultingPromise;
    });
  }

  return updateEntityInner().catch(function handleError(error) {
    dispatch(failActionCreator());

    console.log(error);
  });
}
