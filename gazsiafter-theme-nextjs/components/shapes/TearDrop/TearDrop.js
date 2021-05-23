import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import Shape from "./TearDrop.shape.svg";
import styles from "./TearDrop.module.scss";
import { getShuffledArray } from "../../../common/utils";
import { AppContext } from "../../misc";

const TearDrop = () => {
  const [currentDrops, setCurrentDrops] = useState([]);
  const { lastDropTriggerTime, themeClassName } = useContext(AppContext);

  useEffect(() => {
    if (lastDropTriggerTime) {
      const numberOfDrops = 3;
      const animationDelayGap = 200;
      const animationDelayDice = getShuffledArray(
        new Array(numberOfDrops)
          .fill()
          .map((_, index) => index * animationDelayGap)
      );

      const newDrops = new Array(numberOfDrops).fill().map((_, index) => ({
        dropId: uuid(),
        rotationAmount: (index - 1) * 45,
        animationDelay: animationDelayDice[index],
      }));

      setCurrentDrops([...currentDrops, ...newDrops]);
    }
  }, [lastDropTriggerTime]);

  return currentDrops.map(
    ({ dropId: currentDropId, rotationAmount, animationDelay }) => (
      <div
        key={currentDropId}
        className={styles.tearDrop}
        style={{ transform: `rotate(${rotationAmount}deg)` }}
      >
        <Shape
          className={classNames(styles.dropShape, styles[themeClassName])}
          style={{ animationDelay: `${animationDelay}ms` }}
          onAnimationEnd={() =>
            setCurrentDrops([
              ...currentDrops.filter(({ dropId }) => dropId !== currentDropId),
            ])
          }
        />
      </div>
    )
  );
};

export default TearDrop;
