// Basic global setup. The app proper begins in App.

import React from "react";
import ReactDOM from "react-dom";

import initialState from "./initialState";
import Context from "./components/Context/Context";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Context initialState={initialState}>
    <App />
  </Context>,
  document.getElementById(`root`)
);
registerServiceWorker();
