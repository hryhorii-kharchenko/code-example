import { ENTITIES, HAS_LOADED_ENTITIES } from "../../../constants/entities";
import { ACTION_TYPES } from "./actions";

export const initialAppState = {
  [ENTITIES.CHARACTERS]: [],
  [HAS_LOADED_ENTITIES.CHARACTERS]: false,
  [ENTITIES.SPECIES]: [],
  [HAS_LOADED_ENTITIES.SPECIES]: false,
  [ENTITIES.MOVIES]: [],
  [HAS_LOADED_ENTITIES.MOVIES]: false,
  [ENTITIES.SPACESHIPS]: [],
  [HAS_LOADED_ENTITIES.SPACESHIPS]: false,
  isConnectionError: false,
  favoriteCharactersIds: [],
  selectedCharacterId: "",
  isPopupOpen: false,
};

export function appReducer(state, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.ENTITY_LOAD_SUCCESS: {
      const { entity, values, hasFinishedLoading } = payload;

      return {
        ...state,
        [entity]: [...state[entity], ...values],
        [HAS_LOADED_ENTITIES[entity.toUpperCase()]]: hasFinishedLoading,
        isConnectionError: false,
      };
    }
    case ACTION_TYPES.ENTITY_LOAD_FAIL:
      return { ...state, isConnectionError: true };
    case ACTION_TYPES.FILL_CHARACTER_DATA: {
      const filledCharacterData = state[ENTITIES.CHARACTERS].map(
        function fillCharacter(character) {
          const species = character.speciesIds.map(function getSpeciesNameById(
            speciesId
          ) {
            const concreteSpecies = state.species.find(
              function doesSpeciesIdMatch(speciesElem) {
                return speciesElem.id === speciesId;
              }
            );

            return concreteSpecies?.name;
          });

          const movies = character.moviesIds.map(function getMovieNameById(
            movieId
          ) {
            const concreteMovie = state.movies.find(function doesSpeciesIdMatch(
              movie
            ) {
              return movie.id === movieId;
            });

            return concreteMovie?.name;
          });

          const spaceships = character.spaceshipsIds.map(
            function getSpaceshipsNameById(spaceshipId) {
              const concreteSpaceship = state.spaceships.find(
                function doesSpeciesIdMatch(spaceship) {
                  return spaceship.id === spaceshipId;
                }
              );

              return concreteSpaceship?.name;
            }
          );

          return {
            ...character,
            species,
            movies,
            spaceships,
          };
        }
      );

      return { ...state, [ENTITIES.CHARACTERS]: filledCharacterData };
    }
    case ACTION_TYPES.SET_FAVORITE_CHARACTERS:
      return { ...state, favoriteCharactersIds: payload };
    case ACTION_TYPES.ADD_FAVORITE_CHARACTER: {
      const { favoriteCharacterId, newIndex } = payload;
      const favoriteCharactersIds = [...state.favoriteCharactersIds];

      const favoriteCharacterIndex =
        state.favoriteCharactersIds.indexOf(favoriteCharacterId);

      if (favoriteCharacterIndex > -1) {
        favoriteCharactersIds.splice(favoriteCharacterIndex, 1);
      }

      favoriteCharactersIds.splice(newIndex, 0, favoriteCharacterId);

      return { ...state, favoriteCharactersIds };
    }
    case ACTION_TYPES.REMOVE_FAVORITE_CHARACTER:
      return {
        ...state,
        favoriteCharactersIds: state.favoriteCharactersIds.filter(
          function getDoesIdMatchPayload(favoriteCharacterId) {
            return favoriteCharacterId !== payload;
          }
        ),
      };
    case ACTION_TYPES.SELECT_CHARACTER:
      return { ...state, selectedCharacterId: payload, isPopupOpen: true };
    case ACTION_TYPES.CLOSE_POPUP:
      return {
        ...state,
        selectedCharacterId: initialAppState.selectedCharacterId,
        isPopupOpen: false,
      };
    default:
      return state;
  }
}
