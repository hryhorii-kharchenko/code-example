import React, { useCallback, useReducer } from "react";
import PropTypes from "prop-types";

import CharacterList from "../CharacterList/CharacterList";
import SelectFilter from "../SelectFilter/SelectFilter";
import styles from "./Main.module.scss";
import DateFilter from "../DateFilter/DateFilter";
import {
  isDateAEarlierOrSameAsDateB,
  isDateALaterOrSameAsDateB,
  parseDate,
} from "../../utils/date";
import Progress from "../Progress/Progress";
import { filtersReducer, initialFiltersState } from "./reducer/reducer";
import {
  changeAreFiltersDisjunctive,
  changeFromDate,
  changeFromPeriod,
  changeMovie,
  changeSpecies,
  changeToDate,
  changeToPeriod,
} from "./reducer/actions";

function Main({
  movieOptions,
  speciesOptions,
  characters,
  openCharacterById,
  hasLoadedCharacters,
  hasLoadedFilters,
}) {
  const [
    {
      movie,
      species,
      fromDate,
      fromPeriod,
      toDate,
      toPeriod,
      areFiltersDisjunctive,
    },
    dispatch,
  ] = useReducer(filtersReducer, initialFiltersState, filtersReducer);

  const changeMovieCallback = useCallback(function changeMovieCallback(
    newMovie
  ) {
    dispatch(changeMovie(newMovie));
  },
  []);

  const changeSpeciesCallback = useCallback(function changeSpeciesCallback(
    newSpecies
  ) {
    dispatch(changeSpecies(newSpecies));
  },
  []);

  const changeFromDateByEventCallback = useCallback(
    function changeFromDateByEventCallback(event) {
      const { value } = event.target;

      const filteredValue = value ? value.replace(/\D/g, "") : "";
      const finalValue = filteredValue ? parseInt(filteredValue, 10) : "";

      dispatch(changeFromDate(finalValue));
    },
    []
  );

  const changeFromPeriodCallback = useCallback(
    function changeFromPeriodCallback(newFromPeriod) {
      dispatch(changeFromPeriod(newFromPeriod));
    },
    []
  );

  const changeToDateByEventCallback = useCallback(
    function changeToDateByEventCallback(event) {
      const { value } = event.target;

      const filteredValue = value ? value.replace(/\D/g, "") : "";
      const finalValue = filteredValue ? parseInt(filteredValue, 10) : "";

      dispatch(changeToDate(finalValue));
    },
    []
  );

  const changeToPeriodCallback = useCallback(function changeToPeriodCallback(
    newToPeriod
  ) {
    dispatch(changeToPeriod(newToPeriod));
  },
  []);

  const changeAreFiltersDisjunctiveCallback = useCallback(
    function changeAreFiltersDisjunctiveCallback(event) {
      dispatch(changeAreFiltersDisjunctive(event.target.checked));
    },
    []
  );

  const filteredCharacters = characters.filter(
    function getDoesCharacterMatchFilters(character) {
      let result;

      if (areFiltersDisjunctive) {
        result =
          (!movie &&
            !species &&
            typeof fromDate !== "number" &&
            typeof toDate !== "number") ||
          (movie && character.moviesIds.includes(movie)) ||
          (species && character.speciesIds.includes(species)) ||
          (typeof fromDate === "number" &&
            character.birthYear !== "unknown" &&
            isDateALaterOrSameAsDateB(
              ...parseDate(character.birthYear),
              fromDate,
              fromPeriod
            )) ||
          (typeof toDate === "number" &&
            character.birthYear !== "unknown" &&
            isDateAEarlierOrSameAsDateB(
              ...parseDate(character.birthYear),
              toDate,
              toPeriod
            ));
      } else {
        result =
          (!movie || character.moviesIds.includes(movie)) &&
          (!species || character.speciesIds.includes(species)) &&
          (typeof fromDate !== "number" ||
            (character.birthYear !== "unknown" &&
              isDateALaterOrSameAsDateB(
                ...parseDate(character.birthYear),
                fromDate,
                fromPeriod
              ))) &&
          (typeof toDate !== "number" ||
            (character.birthYear !== "unknown" &&
              isDateAEarlierOrSameAsDateB(
                ...parseDate(character.birthYear),
                toDate,
                toPeriod
              )));
      }

      return result;
    }
  );

  const finalMovieOptions = [{ id: "", name: "Movies" }, ...movieOptions];
  const finalSpeciesOptions = [{ id: "", name: "Species" }, ...speciesOptions];

  const areFiltersDisjunctiveId = "areFiltersDisjunctive";

  const filtersJsx = hasLoadedFilters ? (
    <>
      <div className={styles.filtersGroup}>
        <SelectFilter
          value={movie}
          options={finalMovieOptions}
          changeValue={changeMovieCallback}
        />
        <SelectFilter
          value={species}
          options={finalSpeciesOptions}
          changeValue={changeSpeciesCallback}
        />
      </div>
      <div className={styles.filtersGroup}>
        <DateFilter
          yearValue={fromDate}
          changeYearValue={changeFromDateByEventCallback}
          periodValue={fromPeriod}
          changePeriodValue={changeFromPeriodCallback}
          placeholder="Birth year from"
        />
        <DateFilter
          yearValue={toDate}
          changeYearValue={changeToDateByEventCallback}
          periodValue={toPeriod}
          changePeriodValue={changeToPeriodCallback}
          placeholder="Birth year to"
        />
      </div>
      <div className={styles.filtersGroup}>
        <label htmlFor={areFiltersDisjunctiveId}>
          Show matching any filter
        </label>
        <input
          id={areFiltersDisjunctiveId}
          type="checkbox"
          value={areFiltersDisjunctive}
          onChange={changeAreFiltersDisjunctiveCallback}
        />
      </div>
    </>
  ) : (
    <Progress />
  );

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Characters</h2>

      <section className={styles.filters}>{filtersJsx}</section>
      <section className={styles.characters}>
        <CharacterList
          listId="main"
          characters={filteredCharacters}
          openCharacterById={openCharacterById}
          hasLoadedCharacters={hasLoadedCharacters}
        />
      </section>
    </main>
  );
}

Main.propTypes = {
  movieOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  speciesOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      birthYear: PropTypes.string.isRequired,
      species: PropTypes.arrayOf(PropTypes.string).isRequired,
      speciesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      movies: PropTypes.arrayOf(PropTypes.string).isRequired,
      moviesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      spaceships: PropTypes.arrayOf(PropTypes.string).isRequired,
      spaceshipsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  openCharacterById: PropTypes.func.isRequired,
  hasLoadedCharacters: PropTypes.bool.isRequired,
  hasLoadedFilters: PropTypes.bool.isRequired,
};

export default Main;
