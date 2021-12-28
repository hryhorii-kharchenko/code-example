import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./SelectFilter.module.scss";

function SelectFilter({ value, options, changeValue }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function selectNewValue(option) {
    return function handleClick() {
      changeValue(option);
      setIsOpen(false);
    };
  }

  const optionsJsx = options.map(function getOptionJsx(option) {
    return (
      <li className={styles.option} key={option.id}>
        <button
          className={styles.optionBtn}
          onClick={selectNewValue(option.id)}
          type="button"
        >
          {option.name}
        </button>
      </li>
    );
  });

  const matchingOption = options.find(function doesIdMatch(option) {
    return option.id === value;
  });
  const valueJsx = matchingOption ? matchingOption.name : "Select a value";

  const optionsListJsx = <ul className={styles.options}>{optionsJsx}</ul>;

  return (
    <div className={styles.filter}>
      <button className={styles.display} onClick={toggleIsOpen} type="button">
        {valueJsx}
      </button>
      {isOpen ? optionsListJsx : null}
    </div>
  );
}

SelectFilter.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default SelectFilter;
