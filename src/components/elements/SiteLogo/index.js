import React, { useContext } from 'react';
import Shape from './shape.svg';
import { AppContext } from '../../misc';
import './styles.scss';

const SiteLogo = () => {
	const { setThemeName } = useContext(AppContext);
	return (
		<button className="site-logo" onClick={() => setThemeName('dark')}>
			<Shape />
		</button>
	);
}

export default SiteLogo;