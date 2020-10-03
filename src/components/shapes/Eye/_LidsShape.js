import React from 'react';
import PropTypes from 'prop-types';
import { eyeLidsWidthSimple, eyeLidsWidthCross, eyeLidsHeight } from './_localSettings';
import SimpleLidsShape from './shapeLidsSimple.svg';
import CrossLidsShape from './shapeLidsCross.svg';

const LidsShape = ({ isCrossShape, className }) => {
	const shapeWidth = isCrossShape ? eyeLidsWidthCross : eyeLidsWidthSimple;
	const Shape = isCrossShape ? CrossLidsShape : SimpleLidsShape;

	return (
		<Shape
			className={['eye-lids', `eye-lids-${isCrossShape ? 'cross' : 'simple'}`, className].filter(x => !!x).join(' ')}
			width={shapeWidth}
			height={eyeLidsHeight}
			viewBox={`0 0 ${shapeWidth} ${eyeLidsHeight}`}
		/>
	);
};

LidsShape.propTypes = {
	isCrossShape: PropTypes.bool,
	className: PropTypes.string,
};

export default LidsShape;
