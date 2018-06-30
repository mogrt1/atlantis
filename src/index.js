// Basic global setup. The app proper begins in App.

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

if(window.navigator.standalone) {
  document.querySelector(`meta[name=viewport]`)
    .setAttribute(`content`, `width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no`);
}

const root = document.getElementById(`root`);

document.addEventListener(`touchmove`, (e)=> e.preventDefault(), { passive: false });

ReactDOM.render(<App />, root);
registerServiceWorker();
