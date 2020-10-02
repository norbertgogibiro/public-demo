import React from 'react';
import ReactDOM from 'react-dom';
import './utils/faviconLoader';
import './index.scss';
import ErrorBoundary from './components/misc/ErrorBoundary';
import { Header, Main, Footer } from './components/layout';

const App = () => (
	<div className="theme-orange">
		<ErrorBoundary>
			<Header />
			<Main />
			<Footer />
		</ErrorBoundary>
	</div>
);

ReactDOM.render(<App />, document.querySelector('#root'));