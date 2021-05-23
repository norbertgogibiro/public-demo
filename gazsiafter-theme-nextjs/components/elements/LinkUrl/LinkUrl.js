import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../misc";
import styles from "./LinkUrl.module.scss";

const LinkUrl = ({ className, label, href, isEnhanced }) => {
  const { themeClassName } = useContext(AppContext);
  return (
    <a
      className={classNames(styles.linkUrl, styles[themeClassName], className)}
      target="_blank"
      href={href}
      rel="noreferrer"
    >
      {label}
      {isEnhanced && (
        <FontAwesomeIcon icon={faStar} className={styles.linkEnhancerStar} />
      )}
    </a>
  );
};

LinkUrl.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isEnhanced: PropTypes.bool,
};

export default LinkUrl;
