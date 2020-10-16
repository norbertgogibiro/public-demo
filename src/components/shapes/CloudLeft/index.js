import React from 'react';
import './styles.scss';
import { SvgPathAnimation, SvgWrapper } from '../../misc';

const width = 472;
const height = 1090;

const coordinatesStart = [
	'M.08,0C72.45,11.58,165.13,54.46,205,136.72s52,189.48,32.55,287c-8.43,42.23-22.61',
	'84.81-17.91,127.53,5.89,53.5,39.88,91.49,74.73,115.9s82,47.78,111.26,83.18c51.6',
	'62.44,71.61,158.17,63.72,253.83a356.91,356.91,0,0,0,3,85.85L0,1089.88Z'
].join(',');

const coordinatesEnd = [
	'M-2.39,0C75.69,38.05,136.82,87.78,176.69,170.05s77.87,156.15,58.39,253.71c-8.43',
	'42.23-4.09,78.58.61,121.29,5.89,53.5,53.15,102.59,88,127s73.75,54.6,103,90c51.6',
	'62.44,48.09,146.49,40.19,242.15a356.91,356.91,0,0,0,3,85.85l-472.31-.17Z'
].join(',');

const CloudLeft = () => (
	<div className="cloud-left" style={{ width: `${width}px`, height: `${height}px` }}>
		<SvgWrapper width={width} height={height} className='cloud-left-shape'>
			<path d={coordinatesStart}>
				<SvgPathAnimation
					duration={7000}
					coordinatesStart={coordinatesStart}
					coordinatesEnd={coordinatesEnd}
				/>
			</path>
		</SvgWrapper>
	</div>
);

export default CloudLeft;
