import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getRandomAmount } from '../../../common/utils';

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
		shouldBlinkAutomatically = false,
		shouldBlinkOnClick = false,
		className,
		blinkingSpeed = 200,
		minWaitingBeforeBlinking = blinkingSpeed,
		maxWaitingBeforeBlinking = 9000,
		animationRepeatCount = '0',
		animationFillMode = 'freeze',
		keyframes = [
			new SvgAnimationKeyframe('start', 0),
			new SvgAnimationKeyframe('end', 1),
		],
	} = props;

	const [isOpen, setOpenState] = useState(true);
	const [isAutoBlinkingAllowed, setAutoBlinkingPermission] = useState(shouldBlinkAutomatically);
	const [blinkingTriggeredBy, setBlinkingTriggeredBy] = useState(blinkTriggers.none);
	const [lastBlinkingWaitTime, setLastBlinkingWaitTime] = useState(0);
	const toggleEyeOpenState = () => setOpenState(!isOpen);
	const triggerBlinking = triggeredBy => setBlinkingTriggeredBy(triggeredBy);
	const handleDocumentClick = useCallback(() => triggerBlinking(blinkTriggers.click));
	const shapeWidth = isCrossShape ? eyeLidsWidthCross : eyeLidsWidthSimple;
	const coordinatesClosed = isCrossShape ? coordinatesCrossClosed : coordinatesSimpleClosed;
	const coordinatesOpen = isCrossShape ? coordinatesCrossOpen : coordinatesSimpleOpen;
	const coordinatesStart = isOpen ? coordinatesClosed : coordinatesOpen;
	const coordinatesEnd = isOpen ? coordinatesOpen : coordinatesClosed;
	const performBlinking = function () {
		setOpenState(false);
		setTimeout(() => {
			setOpenState(true);
			setBlinkingTriggeredBy(blinkTriggers.none);
		}, blinkingSpeed);
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

			setTimeout(() => triggerBlinking(blinkTriggers.auto), waitingTimeBeforeBlinking);
			setLastBlinkingWaitTime(randomBlinkWaitingTime);
		}
	}, [isOpen, isAutoBlinkingAllowed]);

	// Update blinking permission:
	useEffect(() => {
		setAutoBlinkingPermission(shouldBlinkAutomatically);
	}, [shouldBlinkAutomatically]);

	// Check for triggered blinking:
	useEffect(() => {
		if (blinkingTriggeredBy !== blinkTriggers.none && isAutoBlinkingAllowed) {
			performBlinking();
		}
	}, [blinkingTriggeredBy, isAutoBlinkingAllowed]);

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
					duration={blinkingSpeed}
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
	shouldBlinkAutomatically: PropTypes.bool,
	shouldBlinkOnClick: PropTypes.bool,
	className: PropTypes.string,
	blinkingSpeed: PropTypes.number,
	animationRepeatCount: PropTypes.number,
	animationFillMode: PropTypes.string,
	minWaitingBeforeBlinking: PropTypes.number,
	maxWaitingBeforeBlinking: PropTypes.number,
	keyframes: PropTypes.arrayOf(
		PropTypes.instanceOf(SvgAnimationKeyframe),
	),
};

export default LidsShape;
