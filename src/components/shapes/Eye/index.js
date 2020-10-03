import React, { useContext } from 'react';
import { AppContext } from '../../misc';
import { eyeLidsWidthSimple, eyeLidsHeight } from './_localSettings';
import LidsShape from './_LidsShape';

const Eye = () => {
	const { eyeTrippingState } = useContext(AppContext);
	const eyeDimensions = {
		width: `${eyeLidsWidthSimple}px`,
		height: `${eyeLidsHeight}px`
	};

	return (
		<div className="eye-clip" style={{ width: `${eyeLidsWidthSimple}px` }}>
			<button className="eye" style={eyeDimensions}>
				<div className="eye-ball-clip">
					<div className="eye-ball-boundary">

						{/* The main eye ball */}
						<div className="eye-ball eye-ball-cursor-follower">

							{/* The outermost layer of the trippy eyes */}
							<div className="eye eye-inner">

								{/* The middle eye ball */}
								<div className="eye-ball">
									<div className="eye" style={eyeDimensions}>

										{/* The innermost eye ball */}
										<div className="eye-ball eye-ball-innermost"></div>

										{/* The innermost eye's blinking lids */}
										<LidsShape className="eye-lids-innermost" />
									</div>

									{/* The inner part of the middle inner eye's blinking horizontal lids */}
									<LidsShape />
								</div>

								{/* The middle inner eye's non-blinking vertical lids */}
								<LidsShape />

								{/* The outer part of the middle inner eye's blinking */}
								{/* horizontal lids with a cut for the vertical eye */}
								<LidsShape isCrossShape />
							</div>
						</div>
					</div >
				</div >

				{/* The main eye's blinking lids */}
				<LidsShape />
			</button >
		</div >
	);
};

export default Eye;
