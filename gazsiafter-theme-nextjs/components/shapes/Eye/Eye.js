import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import classNames from "classnames";
import { AppContext } from "../../misc";
import { getRandomAmount } from "../../../common/utils";
import EyeContext from "./Eye.context";
import styles from "./Eye.module.scss";
import EyeLids from "./components/EyeLids";
import {
  eyeLidsWidthSimple,
  eyeLidsHeight,
  eyeBlinkTime,
  cursorFollowingTime,
} from "./Eye.utils";

const { isEyeStalled: stalledEyeClassName } = styles;

const Eye = () => {
  const [isFollowingCursorMovement, setCursorFollowingMode] = useState(true);
  const refCursorFollower = useRef();

  const {
    themeClassName,
    isEyeHovered,
    isEyeTripping,
    setEyeHoverState,
    setLastDropTriggerTime,
  } = useContext(AppContext);

  const eyeDimensions = {
    width: `${eyeLidsWidthSimple}px`,
    height: `${eyeLidsHeight}px`,
  };

  const setEyeBallPosition = useCallback(function (event = {}) {
    const { innerWidth, innerHeight } = window;
    const { clientX = innerWidth / 2, clientY = innerHeight / 2 } = event;
    const { current: cursorFollowerElement } = refCursorFollower;
    const percentPositionX = (clientX * 100) / innerWidth;
    const percentPositionY = (clientY * 100) / innerHeight;
    cursorFollowerElement.style.top = `${percentPositionY}%`;
    cursorFollowerElement.style.left = `${percentPositionX}%`;
  });

  useEffect(() => {
    if (!isEyeTripping) {
      const { min, max } = cursorFollowingTime[
        isFollowingCursorMovement ? "active" : "passive"
      ];
      const { current: cursorFollowerElement } = refCursorFollower;
      setTimeout(() => {
        setCursorFollowingMode(!isFollowingCursorMovement);
        cursorFollowerElement.classList[
          isFollowingCursorMovement ? "add" : "remove"
        ](stalledEyeClassName);
      }, getRandomAmount(min, max));
    } else {
      setCursorFollowingMode(false);
      setEyeBallPosition();
    }
  }, [isFollowingCursorMovement, isEyeTripping]);

  useEffect(() => {
    setCursorFollowingMode(!isEyeTripping);
  }, [isEyeTripping]);

  useEffect(() => {
    const eventName = "mousemove";
    const removeCursorTrackerEvent = () =>
      document.removeEventListener(eventName, setEyeBallPosition);

    if (isFollowingCursorMovement) {
      document.addEventListener(eventName, setEyeBallPosition);
    } else {
      removeCursorTrackerEvent();
      setEyeBallPosition();
    }

    return () => removeCursorTrackerEvent();
  }, [isFollowingCursorMovement]);

  return (
    <EyeContext.Provider
      value={{
        eyeLidsClass: styles.eyeLids,
        crossShapedClass: styles.eyeLidsCross,
        simpleShapedClass: styles.eyeLidsSimple,
      }}
    >
      <button
        className={classNames(
          styles.eyeWrap,
          styles[themeClassName],
          isEyeTripping && styles.isEyeTripping,
          isEyeHovered && styles.isEyeHovered
        )}
        onMouseOver={() => setEyeHoverState(true)}
        onMouseLeave={() => setEyeHoverState(false)}
        onClick={() => setLastDropTriggerTime(new Date())}
      >
        <div
          className={styles.eyeClip}
          style={{ width: `${eyeLidsWidthSimple}px` }}
        >
          <div className={styles.eye} style={eyeDimensions}>
            <div className={styles.eyeBallClip}>
              <div className={styles.eyeBallBoundary}>
                {/* The main eye ball */}
                <div
                  ref={refCursorFollower}
                  className={classNames(
                    styles.eyeBall,
                    styles.eyeBallCursorFollower
                  )}
                >
                  {/* The outermost layer of the trippy eyes */}
                  <div className={classNames(styles.eye, styles.eyeInner)}>
                    {/* The middle eye ball */}
                    <div className={styles.eyeBall}>
                      <div className={styles.eye} style={eyeDimensions}>
                        {/* The innermost eye ball */}
                        <div
                          className={classNames(
                            styles.eyeBall,
                            styles.eyeBallInnermost
                          )}
                        ></div>

                        {/* The innermost eye's blinking lids */}
                        <EyeLids shouldBlinkAutomatically />
                      </div>

                      {/* The inner part of the middle inner eye's blinking horizontal lids */}
                      <EyeLids animationDelay={eyeBlinkTime} />
                    </div>

                    {/* The middle inner eye's non-blinking vertical lids */}
                    <EyeLids shouldNotBlinkAtAll />

                    {/* The outer part of the middle inner eye's blinking */}
                    {/* horizontal lids with a cut for the vertical eye */}
                    <EyeLids isCrossShape animationDelay={eyeBlinkTime} />
                  </div>
                </div>
              </div>
            </div>

            {/* The main eye's blinking lids */}
            <EyeLids
              shouldBlinkOnClick
              shouldBlinkAutomatically={!isEyeTripping}
              shouldClose={isEyeHovered}
            />
          </div>
        </div>
      </button>
    </EyeContext.Provider>
  );
};

export default Eye;
