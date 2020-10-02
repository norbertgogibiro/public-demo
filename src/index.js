import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './utils/faviconLoader';
import './index.scss';
import { ErrorBoundary, AppContext } from './components/misc';
import { Header, Main, Footer } from './components/layout';

const App = () => {
	const [themeName, setThemeName] = useState('orange');

	return (
		<div className={`theme-${themeName}`}>
			<ErrorBoundary>
				<AppContext.Provider value={{ setThemeName }}>
					<Header />
					<Main />
					<Footer />
				</AppContext.Provider>
			</ErrorBoundary>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));