import { PERIODS } from "../../../constants/date";
import { ACTION_TYPES } from "./actions";

export const initialFiltersState = {
  movie: "",
  species: "",
  fromDate: "",
  fromPeriod: PERIODS.BBY,
  toDate: "",
  toPeriod: PERIODS.ABY,
  areFiltersDisjunctive: false,
};

export function filtersReducer(state, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.CHANGE_MOVIE:
      return { ...state, movie: payload };
    case ACTION_TYPES.CHANGE_SPECIES:
      return { ...state, species: payload };
    case ACTION_TYPES.CHANGE_FROM_DATE:
      return { ...state, fromDate: payload };
    case ACTION_TYPES.CHANGE_FROM_PERIOD:
      return { ...state, fromPeriod: payload };
    case ACTION_TYPES.CHANGE_TO_DATE:
      return { ...state, toDate: payload };
    case ACTION_TYPES.CHANGE_TO_PERIOD:
      return { ...state, toPeriod: payload };
    case ACTION_TYPES.CHANGE_ARE_FILTERS_DISJUNCTIVE:
      return { ...state, areFiltersDisjunctive: payload };
    default:
      return state;
  }
}
