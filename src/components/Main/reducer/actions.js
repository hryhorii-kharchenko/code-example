export const ACTION_TYPES = {
  CHANGE_MOVIE: "CHANGE_MOVIE",
  CHANGE_SPECIES: "CHANGE_SPECIES",
  CHANGE_FROM_DATE: "CHANGE_FROM_DATE",
  CHANGE_FROM_PERIOD: "CHANGE_FROM_PERIOD",
  CHANGE_TO_DATE: "CHANGE_TO_DATE",
  CHANGE_TO_PERIOD: "CHANGE_TO_PERIOD",
  CHANGE_ARE_FILTERS_DISJUNCTIVE: "CHANGE_ARE_FILTERS_DISJUNCTIVE",
};

export function changeMovie(newMovie) {
  return { type: ACTION_TYPES.CHANGE_MOVIE, payload: newMovie };
}

export function changeSpecies(newSpecies) {
  return { type: ACTION_TYPES.CHANGE_SPECIES, payload: newSpecies };
}

export function changeFromDate(newDate) {
  return {
    type: ACTION_TYPES.CHANGE_FROM_DATE,
    payload: newDate,
  };
}

export function changeFromPeriod(newPeriod) {
  return {
    type: ACTION_TYPES.CHANGE_FROM_PERIOD,
    payload: newPeriod,
  };
}

export function changeToDate(newDate) {
  return {
    type: ACTION_TYPES.CHANGE_TO_DATE,
    payload: newDate,
  };
}

export function changeToPeriod(newPeriod) {
  return {
    type: ACTION_TYPES.CHANGE_TO_PERIOD,
    payload: newPeriod,
  };
}

export function changeAreFiltersDisjunctive(newAreFiltersDisjunctive) {
  return {
    type: ACTION_TYPES.CHANGE_ARE_FILTERS_DISJUNCTIVE,
    payload: newAreFiltersDisjunctive,
  };
}
