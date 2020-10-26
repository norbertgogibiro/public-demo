import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import Shape from './shape.svg';
import './styles.scss';
import { getShuffledArray } from '../../../common/utils';
import { AppContext } from '../../misc';

const Drop = () => {
	const [currentDrops, setCurrentDrops] = useState([]);
	const { lastDropTriggerTime } = useContext(AppContext);

	useEffect(() => {
		if (lastDropTriggerTime) {
			const numberOfDrops = 3;
			const animationDelayGap = 200;
			const animationDelayDice = getShuffledArray(
				new Array(numberOfDrops)
					.fill()
					.map((_, index) => index * animationDelayGap)
			);

			const newDrops = new Array(numberOfDrops).fill().map((_, index) => ({
				dropId: uuid(),
				rotationAmount: (index - 1) * 45,
				animationDelay: animationDelayDice[index]
			}));

			setCurrentDrops([...currentDrops, ...newDrops]);
		}
	}, [lastDropTriggerTime]);

	return currentDrops.map(({ dropId: currentDropId, rotationAmount, animationDelay }) => {
		const dropWrapAttributes = {
			className: 'drop-wrap',
			style: { transform: `rotate(${rotationAmount}deg)` }
		};

		const dropShapeAttributes = {
			className: 'drop-shape',
			style: { animationDelay: `${animationDelay}ms` },
			onAnimationEnd: () => setCurrentDrops([
				...currentDrops.filter(({ dropId }) => dropId !== currentDropId)
			])
		};

		return (
			<div key={currentDropId} {...dropWrapAttributes}>
				<Shape {...dropShapeAttributes} />
			</div>
		);
	});
};

export default Drop;