import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { AppContext } from '../../misc';
import { getRandomAmount } from '../../../common/utils';
import './styles.scss';
import { 
	eyeLidsWidthSimple, 
	eyeLidsHeight, 
	eyeBlinkTime,
	cursorFollowingTime 
} from './_localSettings';
import LidsShape from './_LidsShape';

const stalledEyeClassName = 'is-stalled';

const Eye = () => {
	const [isEyeFollowing, setEyeFollowingMode] = useState(true);
	const { isEyeTripping } = useContext(AppContext);
	const refCursorFollower = useRef();
	const eyeDimensions = {
		width: `${eyeLidsWidthSimple}px`,
		height: `${eyeLidsHeight}px`
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
			const { min, max } = cursorFollowingTime[isEyeFollowing ? 'active' : 'passive'];
			const { current: cursorFollowerElement } = refCursorFollower;
			setTimeout(() => {
				setEyeFollowingMode(!isEyeFollowing);
				cursorFollowerElement.classList[isEyeFollowing ? 'add' : 'remove'](stalledEyeClassName);
			}, getRandomAmount(min, max));
		}

		else {
			setEyeFollowingMode(false);
			setEyeBallPosition();
		}
	}, [isEyeFollowing, isEyeTripping]);

	useEffect(() => {
		setEyeFollowingMode(!isEyeTripping);
	}, [isEyeTripping]);

	useEffect(() => {
		const eventName = 'mousemove';
		const removeCursorTrackerEvent = () => document.removeEventListener(eventName, setEyeBallPosition);

		if (isEyeFollowing) {
			document.addEventListener(eventName, setEyeBallPosition);
		}

		else {
			removeCursorTrackerEvent();
			setEyeBallPosition();
		}

		return () => removeCursorTrackerEvent();
	}, [isEyeFollowing]);
	return (
		<div className="eye-clip" style={{ width: `${eyeLidsWidthSimple}px` }}>
			<div className='eye' style={eyeDimensions}>
				<div className="eye-ball-clip">
					<div className="eye-ball-boundary">

						{/* The main eye ball */}
						<div className="eye-ball eye-ball-cursor-follower" ref={refCursorFollower}>

							{/* The outermost layer of the trippy eyes */}
							<div className="eye eye-inner">

								{/* The middle eye ball */}
								<div className="eye-ball">
									<div className="eye" style={eyeDimensions}>

										{/* The innermost eye ball */}
										<div className="eye-ball eye-ball-innermost"></div>

										{/* The innermost eye's blinking lids */}
										<LidsShape className="eye-lids-innermost" shouldBlinkAutomatically />
									</div>

									{/* The inner part of the middle inner eye's blinking horizontal lids */}
									<LidsShape animationDelay={eyeBlinkTime} />
								</div>

								{/* The middle inner eye's non-blinking vertical lids */}
								<LidsShape shouldNotBlinkAtAll />

								{/* The outer part of the middle inner eye's blinking */}
								{/* horizontal lids with a cut for the vertical eye */}
								<LidsShape isCrossShape animationDelay={eyeBlinkTime} />
							</div>
						</div>
					</div >
				</div >

				{/* The main eye's blinking lids */}
				<LidsShape shouldBlinkOnClick shouldBlinkAutomatically={!isEyeTripping}/>
			</div >
		</div >
	);
};

export default Eye;
