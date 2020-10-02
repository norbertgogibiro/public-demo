import React, { useContext } from 'react';
import Shape from './shape.svg';
import { AppContext } from '../../misc';
import './styles.scss';

const SiteLogo = () => {
	const { switchTheme } = useContext(AppContext);

	return (
		<button className="site-logo" onClick={switchTheme}>
			<Shape />
		</button>
	);
};

export default SiteLogo;