import React, { useContext } from "react";
import classNames from "classnames";
import { SvgPathAnimation, SvgWrapper, AppContext } from "../../misc";
import {
  width,
  height,
  coordinatesStart,
  coordinatesEnd,
} from "./CloudRight.utils";
import styles from "./CloudRight.module.scss";

const CloudRight = () => {
  const { themeClassName, isEyeTripping } = useContext(AppContext);
  return (
    <div
      className={classNames(
        styles.cloudRight,
        styles[themeClassName],
        isEyeTripping && styles.isEyeTripping
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <SvgWrapper
        width={width}
        height={height}
        className={styles.cloudRightShape}
      >
        <path d={coordinatesStart}>
          <SvgPathAnimation
            duration={3500}
            coordinatesStart={coordinatesStart}
            coordinatesEnd={coordinatesEnd}
          />
        </path>
      </SvgWrapper>
    </div>
  );
};

export default CloudRight;
