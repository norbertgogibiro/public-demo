import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './common/faviconLoader';
import { getRandomAmount } from './common/utils';
import { ErrorBoundary, AppContext } from './components/misc';
import { Header, Main, Footer } from './components/layout';

const defaultThemeName = 'orange';
const minAllowedProbability = 0;
const maxAllowedProbability = 100;
const themeProbability = {
	orange: 60,
	yellow: 10,
	blue: 10,
	night: 5,
	dark: 5,
	poison: 2
};


const getRandomThemeName = function (currentThemeName) {
	const themeProbabilityValues = Object.values(themeProbability);
	const allValuesValid = themeProbabilityValues.every(val => {
		const isWholeNumber = Number.isInteger(val);
		const isValid = isWholeNumber && (val > minAllowedProbability - 1) && (val < maxAllowedProbability + 1);

		if (!isValid) {
			console.error(
				`ERROR: invalid theme probability value "${val}" - 
      	it has to be a whole number between ${minAllowedProbability} and ${maxAllowedProbability}`
			);
		}

		return isValid;
	});

	if (!allValuesValid) {
		return defaultThemeName;
	}

	const themeNameDice = Object.entries(themeProbability)
		.filter(({ 0: themeName }) => themeName !== currentThemeName)
		.map(({ 0: themeName, 1: probability }) => new Array(probability).fill(themeName))
		.flat();

	return themeNameDice[
		Math.round(getRandomAmount(0, themeNameDice.length - 1))
	];
};

const App = () => {
	const [themeName, setThemeName] = useState(getRandomThemeName());
	const [isEyeTripping, setEyeTrippingState] = useState(false);
	const switchTheme = () => setThemeName(getRandomThemeName(themeName));
	const appContextProps = {
		switchTheme,
		isEyeTripping,
		setEyeTrippingState
	};

	const canvasClasses = [
		'canvas',
		`theme-${themeName}`
	];

	if (isEyeTripping) {
		canvasClasses.push('is-eye-tripping');
	}

	return (
		<div className={canvasClasses.join(' ')}>
			<ErrorBoundary>
				<AppContext.Provider value={appContextProps}>
					<Header />
					<Main />
					<Footer />
				</AppContext.Provider>
			</ErrorBoundary>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));