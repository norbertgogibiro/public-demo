import React from 'react';
import './styles.scss';
import {
	CloudLeft,
	CloudRight,
	Drop,
	Star,
	Eye
} from '../../shapes';

const Main = () => (
	<main>
		<div className="canvas">
			<CloudLeft />
			<CloudRight />
			<Drop />
			<Star />
			<Eye />
		</div>
	</main>
);

export default Main;
