import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../misc";
import { CloudLeft, CloudRight, TearDrop, Star, Eye } from "../../shapes";
import styles from "./Main.module.scss";

const Main = () => {
  const { themeClassName, isEyeTripping } = useContext(AppContext);
  return (
    <main className={styles.main}>
      <div
        className={classNames(
          styles.canvas,
          styles[themeClassName],
          isEyeTripping && styles.isEyeTripping
        )}
      >
        <CloudLeft />
        <CloudRight />
        <TearDrop />
        <div className={styles.layerPattern} />
        <Star />
        <Eye />
      </div>
    </main>
  );
};

export default Main;
