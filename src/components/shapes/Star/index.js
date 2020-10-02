import React from 'react';
import './styles.scss';
import Shape from './shape.svg';

const Star = () => (
	<div className="star" style={{width: '946px', height: '696px'}}>
		<Shape className="star-shape" />
	</div>
);

export default Star;
