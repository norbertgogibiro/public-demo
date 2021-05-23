import React, { useContext } from "react";
import classNames from "classnames";
import { SvgPathAnimation, SvgWrapper, AppContext } from "../../misc";
import {
  width,
  height,
  coordinatesStart,
  coordinatesEnd,
} from "./CloudLeft.utils";
import styles from "./CloudLeft.module.scss";

const CloudLeft = () => {
  const { themeClassName, isEyeTripping } = useContext(AppContext);
  return (
    <div
      className={classNames(
        styles.cloudLeft,
        styles[themeClassName],
        isEyeTripping && styles.isEyeTripping
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <SvgWrapper
        width={width}
        height={height}
        className={styles.cloudLeftShape}
      >
        <path d={coordinatesStart}>
          <SvgPathAnimation
            duration={7000}
            coordinatesStart={coordinatesStart}
            coordinatesEnd={coordinatesEnd}
          />
        </path>
      </SvgWrapper>
    </div>
  );
};

export default CloudLeft;
