import React from 'react';
import './styles.scss';
import { SvgPathAnimation, SvgWrapper } from '../../misc';

const width = 397;
const height = 615;

const coordinatesStart = [
	'M397.88,0C345,5,289.89,20.39,257.39,58c-33.58,38.83-43.21,96.24-30.92,144.38,5.32,20.84',
	'14.55,41.8,10.95,63-4.52,26.56-28,45.71-51.88,58.13S135.21,344.55,115,362.36c-35.65',
	'31.43-56,82.45-51.54,129.76C68.55,546.32,41.24,590.8,0,614.41l398,1.41Z'
].join(',');

const coordinatesEnd = [
	'M397,.07C344.11,5,308.58,40.9,276.08,78.48c-33.58,38.84-49,75-50.49,124-.65,21.5-5.9',
	'51.85-9.51,73.05-4.51,26.56-7.51,35.66-31.41,48.08s-53.38,18.11-70.55,38.87c-24',
	'29.05-46.57,82.5-51.54,129.76-5.5,52.29-22.21,98.68-63.46,122.29l398,1.41Z'
].join(',');

const CloudRight = () => (
	<div className="cloud-right" style={{ width: `${width}px`, height: `${height}px` }}>
		<SvgWrapper width={width} height={height} className="cloud-right-shape">
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

export default CloudRight;
