import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../misc";
import styles from "./Star.module.scss";

const Star = () => {
  const { themeClassName, isEyeTripping, isEyeHovered } = useContext(
    AppContext
  );
  return (
    <div
      className={classNames(
        styles.star,
        styles[themeClassName],
        isEyeTripping && styles.isEyeTripping,
        isEyeHovered && styles.isEyeHovered
      )}
    />
  );
};

export default Star;
