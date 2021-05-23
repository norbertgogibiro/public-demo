import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../misc";
import Shape from "./BandLogo.shape.svg";
import styles from "./BandLogo.module.scss";

const BandLogo = () => {
  const { switchTheme, themeClassName } = useContext(AppContext);

  return (
    <button
      className={classNames(styles.bandLogo, styles[themeClassName])}
      onClick={switchTheme}
    >
      <Shape />
    </button>
  );
};

export default BandLogo;
