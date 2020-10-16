import React from 'react';
import './styles.scss';
import { SvgPathAnimation, SvgWrapper } from '../../misc';

const width = 946;
const height = 696;

const coordinatesStart = [
	'M946.61,339.33,816.08,290.87l-93-34.51,7.68-44L754.71,75.23,638.64,152.12l-84.9',
	'56.24-31.88-79.2L469.88,0,411.8,126.54l-37,80.52-82.93-54.94L175.83,75.23l23.95',
	'137.15L208.43,262l-77.9,28.91L0,339.33l124.92,61.49,82.31,40.52L199.78,484,175.83',
	'621.19,291.91,544.3l84.9-56.25,31.87,79.2,52,129.17,58.08-126.54,37-80.53,82.94',
	'54.95,116.07,76.89L730.77,484l-6.18-35.41,97.1-47.8Z'
].join(',');

const coordinatesEnd = [
	'M889.7,341.78l-148-78L723,256.36,765.7,72.78l6-22-204,148-14.11,9.58-6.89-17.58-83-140-82',
	'141-7,15.28-13-9.28-209-147,5,19L208.29,262,77.7,332.78l-17,9,132,90,14.38,9.56-2.38',
	'12.44-45,197,217-162,0-.73,6,13.73,78,149,87-145,7.86-16.43,12.14,8.43,211',
	'153-51-186-3.25-16.16,12.25-5.84Z'
].join(',');

const Star = () => (
	<div className="star" style={{ width: `${width}px`, height: `${height}px` }}>
		<SvgWrapper width={width} height={height} className="star-shape">
			<path d={coordinatesStart}>
				<SvgPathAnimation
					duration={2800}
					coordinatesStart={coordinatesStart}
					coordinatesEnd={coordinatesEnd}
				/>
			</path>
		</SvgWrapper>
	</div>
);

export default Star;
