import { PERIODS } from "../constants/date";

export function isDateAEarlierOrSameAsDateB(
  dateAYear,
  dateAPeriod,
  dateBYear,
  dateBPeriod
) {
  return (
    (dateAYear === dateBYear && dateAYear === 0) ||
    (dateAPeriod === PERIODS.BBY && dateBPeriod === PERIODS.ABY) ||
    (dateAPeriod === dateBPeriod &&
      ((dateAPeriod === PERIODS.BBY && dateAYear >= dateBYear) ||
        (dateAPeriod === PERIODS.ABY && dateAYear <= dateBYear)))
  );
}

export function isDateALaterOrSameAsDateB(
  dateAYear,
  dateAPeriod,
  dateBYear,
  dateBPeriod
) {
  return (
    (dateAYear === dateBYear && dateAYear === 0) ||
    (dateAPeriod === PERIODS.ABY && dateBPeriod === PERIODS.BBY) ||
    (dateAPeriod === dateBPeriod &&
      ((dateAPeriod === PERIODS.BBY && dateAYear <= dateBYear) ||
        (dateAPeriod === PERIODS.ABY && dateAYear >= dateBYear)))
  );
}

export function parseDate(dateStr) {
  return [dateStr.slice(0, -3), dateStr.slice(-3)];
}
