// Basic global setup. The app proper begins in App.

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const root = document.getElementById(`root`);

root.addEventListener(`touchstart`, (e)=> {
  if(
    e.target.className.includes(`GamepadView`)
    || e.target.parentNode.className.includes(`GamepadView`)
    || e.target.className.includes(`PrimaryButtons`)
    || e.target.tagName === `CANVAS`
  ) {
    e.preventDefault();
  }
}, { passive: false });

root.addEventListener(`touchmove`, (e)=> e.preventDefault(), { passive: false });

ReactDOM.render(<App />, root);
registerServiceWorker();

if(module.hot) {
  module.hot.accept();
}
