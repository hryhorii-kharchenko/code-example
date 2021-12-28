import React from "react";
import PropTypes from "prop-types";

import styles from "./ErrorBanner.module.scss";

function ErrorBanner({ isActive }) {
  let bannerJsx = null;

  if (isActive) {
    bannerJsx = (
      <div className={styles.banner}>
        <p className={styles.message}>
          Network connection error. Try reloading page.
        </p>
      </div>
    );
  }

  return bannerJsx;
}

ErrorBanner.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ErrorBanner;
