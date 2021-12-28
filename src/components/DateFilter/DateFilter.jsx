import React from "react";
import PropTypes from "prop-types";

import SelectFilter from "../SelectFilter/SelectFilter";

import { PERIOD_OPTIONS } from "../../constants/date";
import styles from "./DateFilter.module.scss";

function DateFilter({
  yearValue,
  changeYearValue,
  periodValue,
  changePeriodValue,
  placeholder,
}) {
  return (
    <div className={styles.dateFilter}>
      <input
        value={yearValue}
        onChange={changeYearValue}
        className={styles.input}
        placeholder={placeholder}
      />
      <SelectFilter
        value={periodValue}
        options={PERIOD_OPTIONS}
        changeValue={changePeriodValue}
      />
    </div>
  );
}

DateFilter.propTypes = {
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  changeYearValue: PropTypes.func.isRequired,
  periodValue: PropTypes.string.isRequired,
  changePeriodValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

DateFilter.defaultProps = {
  placeholder: "",
};

export default DateFilter;
