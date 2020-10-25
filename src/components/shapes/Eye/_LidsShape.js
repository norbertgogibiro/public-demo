import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../misc';
import { getRandomAmount } from '../../../common/utils';
import { eyeBlinkTime } from './_localSettings';

import {
	eyeLidsWidthSimple,
	eyeLidsWidthCross,
	eyeLidsHeight
} from './_localSettings';

import {
	coordinatesSimpleOpen,
	coordinatesSimpleClosed,
	coordinatesCrossOpen,
	coordinatesCrossClosed
} from './_pathCoordinates';

import {
	SvgWrapper,
	SvgPathAnimation,
	SvgAnimationKeyframe
} from '../../misc';

const clickEventName = 'click';
const blinkTriggers = {
	none: 'none',
	click: clickEventName,
	auto: 'auto'
};

const LidsShape = props => {
	const {
		isCrossShape,
		shouldClose = false,
		shouldBlinkAutomatically = false,
		shouldBlinkOnClick = false,
		shouldNotBlinkAtAll = false,
		className,
		minWaitingBeforeBlinking = eyeBlinkTime,
		maxWaitingBeforeBlinking = 9000,
		animationDelay,
		animationRepeatCount = '0',
		animationFillMode = 'freeze',
		keyframes = [
			new SvgAnimationKeyframe('start', 0),
			new SvgAnimationKeyframe('end', 1),
		],
	} = props;

	const [isOpen, setOpenState] = useState(true);
	const [isAutoBlinkingAllowed, setAutoBlinkingPermission] = useState(shouldBlinkAutomatically && !shouldClose);
	const [blinkingTriggeredBy, setBlinkingTriggeredBy] = useState(blinkTriggers.none);
	const [lastBlinkingWaitTime, setLastBlinkingWaitTime] = useState(0);
	const [timerIds, setTimerIds] = useState([]);
	const { isEyeTripping } = useContext(AppContext);
	const triggerBlinking = triggeredBy => setBlinkingTriggeredBy(triggeredBy);
	const clearAllTimers = () => timerIds.forEach(timerId => clearTimeout(timerId));
	const handleDocumentClick = useCallback(() => triggerBlinking(blinkTriggers.click));
	const shapeWidth = isCrossShape ? eyeLidsWidthCross : eyeLidsWidthSimple;
	const coordinatesClosed = isCrossShape ? coordinatesCrossClosed : coordinatesSimpleClosed;
	const coordinatesOpen = isCrossShape ? coordinatesCrossOpen : coordinatesSimpleOpen;
	const coordinatesStart = isOpen ? coordinatesClosed : coordinatesOpen;
	const coordinatesEnd = isOpen ? coordinatesOpen : coordinatesClosed;
	const blink = function () {
		if (!shouldNotBlinkAtAll) {
			setOpenState(false);
			clearAllTimers();
			setTimerIds([
				...timerIds,
				setTimeout(() => {
					setOpenState(!shouldClose);
					setBlinkingTriggeredBy(blinkTriggers.none);
				}, eyeBlinkTime)
			]);
		}
	};

	// Make the eye blink automatically:
	useEffect(() => {
		if (isOpen && isAutoBlinkingAllowed && blinkingTriggeredBy !== blinkTriggers.click) {
			const randomBlinkWaitingTime = getRandomAmount(minWaitingBeforeBlinking, maxWaitingBeforeBlinking);

			const blinkSpeedDice = [
				minWaitingBeforeBlinking,
				randomBlinkWaitingTime,
				randomBlinkWaitingTime,
				randomBlinkWaitingTime
			];

			const {
				[Math.round(getRandomAmount(0, blinkSpeedDice.length - 1))]: waitingTimeBeforeBlinking
			} = blinkSpeedDice.filter(diceValue => diceValue !== lastBlinkingWaitTime);

			setTimerIds([...timerIds, setTimeout(() => triggerBlinking(blinkTriggers.auto), waitingTimeBeforeBlinking)]);
			setLastBlinkingWaitTime(randomBlinkWaitingTime);
		}
	}, [isOpen, isAutoBlinkingAllowed]);

	// Update blinking permission:
	useEffect(() => {
		setAutoBlinkingPermission(shouldBlinkAutomatically && !shouldClose);
		setOpenState(!shouldClose);
	}, [shouldBlinkAutomatically, shouldClose]);

	// Check for triggered blinking:
	useEffect(() => {
		if (blinkingTriggeredBy !== blinkTriggers.none && isAutoBlinkingAllowed && !shouldClose) {
			blink();
		}

		if (shouldClose) {
			clearAllTimers();
			setOpenState(false);
		}
	}, [blinkingTriggeredBy, isAutoBlinkingAllowed, shouldClose]);

	// Handle tripping eye state change:
	useEffect(() => {
		blink();
	}, [isEyeTripping]);

	// Set document click handler:
	useEffect(() => {
		const removeDocumentClickHandler = () => document.removeEventListener(clickEventName, handleDocumentClick);

		if (shouldBlinkOnClick && blinkingTriggeredBy === blinkTriggers.none) {
			document.addEventListener(clickEventName, handleDocumentClick);
		}

		else {
			removeDocumentClickHandler();
		}

		return () => removeDocumentClickHandler();
	}, [shouldBlinkOnClick, blinkingTriggeredBy]);

	return (
		<SvgWrapper
			key={isOpen}
			className={['eye-lids', `eye-lids-${isCrossShape ? 'cross' : 'simple'}`, className].filter(x => !!x).join(' ')}
			width={shapeWidth}
			height={eyeLidsHeight}
			viewBox={`0 0 ${shapeWidth} ${eyeLidsHeight}`}
		>
			<path d={coordinatesStart}>
				<SvgPathAnimation
					duration={eyeBlinkTime}
					delay={animationDelay}
					coordinatesStart={coordinatesStart}
					coordinatesEnd={coordinatesEnd}
					keyframes={keyframes}
					repeatCount={animationRepeatCount}
					fillMode={animationFillMode}
				/>
			</path>
		</SvgWrapper>
	);
};

LidsShape.propTypes = {
	isCrossShape: PropTypes.bool,
	shouldClose: PropTypes.bool,
	shouldBlinkAutomatically: PropTypes.bool,
	shouldBlinkOnClick: PropTypes.bool,
	shouldNotBlinkAtAll: PropTypes.bool,
	className: PropTypes.string,
	animationRepeatCount: PropTypes.number,
	animationDelay: PropTypes.number,
	animationFillMode: PropTypes.string,
	minWaitingBeforeBlinking: PropTypes.number,
	maxWaitingBeforeBlinking: PropTypes.number,
	handleTrippingEyeStateChange: PropTypes.func,
	keyframes: PropTypes.arrayOf(
		PropTypes.instanceOf(SvgAnimationKeyframe),
	),
};

export default LidsShape;
