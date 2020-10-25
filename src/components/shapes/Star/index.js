import React, { useState } from 'react';
import './styles.scss';
import Eye from '../Eye';

const Star = () => {
	const [isHovered, setHoverState] = useState(false);

	const attributes = {
		className: 'star',
		onMouseOver: () => setHoverState(true),
		onMouseLeave: () => setHoverState(false),
	};

	return (
		<div {...attributes}>
			<Eye shouldClose={isHovered} />
		</div>
	);
}

export default Star;
