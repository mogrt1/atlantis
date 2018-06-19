import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { saveValue } from './cores/GameBoy-Online/js/index';

saveValue.subscribe((key, value)=> {
  console.log(`key, value`, key, value);
});

const root = document.getElementById(`root`);

root.addEventListener(`touchmove`, (e)=> e.preventDefault());
root.addEventListener(`mousemove`, (e)=> e.preventDefault());

ReactDOM.render(<App />, root);
registerServiceWorker();
