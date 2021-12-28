import React from "react";
import PropTypes from "prop-types";

import styles from "./Popup.module.scss";
import closeIcon from "../../assets/img/icons/close.svg";
import Progress from "../Progress/Progress";

function Popup({ children, isOpen, closePopup, hasLoadedCompletely }) {
  const contentJsx = hasLoadedCompletely ? children : <Progress />;

  const popupJsx = (
    <>
      <div className={styles.popup}>
        <div className={styles.content}>{contentJsx}</div>
        <button className={styles.closeBtn} onClick={closePopup} type="button">
          <img src={closeIcon} alt="close" className={styles.closeIcon} />
        </button>
      </div>
      <div className={styles.backdrop} onClick={closePopup} />
    </>
  );

  return isOpen ? popupJsx : null;
}

Popup.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  hasLoadedCompletely: PropTypes.bool.isRequired,
};

export default Popup;
