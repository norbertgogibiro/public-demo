import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppContext } from "../../misc";
import styles from "./Dropdown.module.scss";
import { clickEvents } from "../../../common/globalVariables";

const closerEvents = [...clickEvents, "keyup"];

const Dropdown = ({ openerButtonText, children }) => {
  const [dropdownOpenState, setDropdownOpenState] = useState(false);
  const { setEyeTrippingState, themeClassName } = useContext(AppContext);
  const handleDropdownClosing = ({ key, type, target }) => {
    const isEscapeButtonKeyup = type === "keyup" && key === "Escape";

    if (clickEvents.includes(type) || isEscapeButtonKeyup) {
      setDropdownOpenState(false);
      closerEvents.forEach((eventName) =>
        document.removeEventListener(eventName, handleDropdownClosing)
      );

      if (
        !target.classList.contains(styles.dropdownContainer) ||
        isEscapeButtonKeyup
      ) {
        setEyeTrippingState(false);
      }
    }
  };

  useEffect(() => {
    if (dropdownOpenState) {
      closerEvents.forEach((eventName) =>
        document.addEventListener(eventName, handleDropdownClosing)
      );
      setEyeTrippingState(true);
    }

    return function cleanUp() {
      closerEvents.forEach((eventName) =>
        document.removeEventListener(eventName, handleDropdownClosing)
      );
    };
  }, [dropdownOpenState]);

  return (
    <div
      className={classNames(
        styles.dropdownContainer,
        styles[themeClassName],
        dropdownOpenState && styles.dropdownStateOpen
      )}
    >
      <button
        className={styles.dropdownOpener}
        onClick={() => setDropdownOpenState(!dropdownOpenState)}
      >
        {openerButtonText}
      </button>

      <div className={styles.dropdown}>{children}</div>
    </div>
  );
};

Dropdown.propTypes = {
  openerButtonText: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default Dropdown;
