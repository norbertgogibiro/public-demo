import React, { useState } from "react";
import Head from "next/head";
import classNames from "classnames";
import { getRandomAmount } from "../common/utils";
import { ErrorBoundary, AppContext } from "../components/misc";
import { Header, Main, Footer } from "../components/layout";

const faviconFolderPath = "/favicons";
const defaultThemeName = "orange";
const minAllowedProbability = 0;
const maxAllowedProbability = 100;
const themeProbability = {
  orange: 55,
  yellow: 10,
  blue: 10,
  night: 10,
  dark: 10,
  poison: 5,
};

const getRandomThemeName = function (currentThemeName) {
  const themeProbabilityValues = Object.values(themeProbability);
  const allValuesValid = themeProbabilityValues.every((val) => {
    const isWholeNumber = Number.isInteger(val);
    const isValid =
      isWholeNumber &&
      val > minAllowedProbability - 1 &&
      val < maxAllowedProbability + 1;

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
    .map(({ 0: themeName, 1: probability }) =>
      new Array(probability).fill(themeName)
    )
    .flat();

  return themeNameDice[
    Math.round(getRandomAmount(0, themeNameDice.length - 1))
  ];
};

export default function Home() {
  const [themeName, setThemeName] = useState(getRandomThemeName());
  const [isEyeTripping, setEyeTrippingState] = useState(false);
  const [isEyeHovered, setEyeHoverState] = useState(false);
  const [lastDropTriggerTime, setLastDropTriggerTime] = useState(null);
  const switchTheme = () => setThemeName(getRandomThemeName(themeName));
  const themeClassName = `theme-${themeName}`;
  const appContextProps = {
    themeClassName,
    switchTheme,
    isEyeTripping,
    isEyeHovered,
    lastDropTriggerTime,
    setEyeTrippingState,
    setEyeHoverState,
    setLastDropTriggerTime,
  };

  return (
    <div className={classNames("gazsi-app-wrap", themeClassName)}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Paperdeer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${faviconFolderPath}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${faviconFolderPath}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href={`${faviconFolderPath}/favicon-194x194.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${faviconFolderPath}/android-chrome-192x192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${faviconFolderPath}/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${faviconFolderPath}/site.webmanifest`} />
        <link
          rel="mask-icon"
          href={`${faviconFolderPath}/safari-pinned-tab.svg`}
          color="#f26539"
        />
        <link rel="shortcut icon" href={`${faviconFolderPath}/favicon.ico`} />
        <meta name="apple-mobile-web-app-title" content="Paperdeer" />
        <meta name="application-name" content="Paperdeer" />
        <meta name="msapplication-TileColor" content="#f26539" />
        <meta
          name="msapplication-config"
          href={`${faviconFolderPath}/browserconfig.xml`}
        />
        <meta name="theme-color" content="#f26539" />
        <title>Paperdeer</title>
        <meta
          name="description"
          content="Homepage of the Budapest- and Copenhagen-based indie electronic music band Paperdeer"
        />
      </Head>

      <ErrorBoundary>
        <AppContext.Provider value={appContextProps}>
          <Header />
          <Main />
          <Footer />
        </AppContext.Provider>
      </ErrorBoundary>
    </div>
  );
}
