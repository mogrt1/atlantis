// Basic global setup. The app proper begins in App.

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, root);
registerServiceWorker();
