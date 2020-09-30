import React from "react";
import ReactDOM from "react-dom";
import Drop from './components/shapes/Drop';
import './utils/faviconLoader';
import './index.scss';

const App = () => {
  return (
    <div>
      <div>Welcome to my-webpack-react-starter</div>
      <Drop/>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));