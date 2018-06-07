import React from 'react';
import './App.css';
import Store from './components/Store';

class App extends React.Component {
  render() {
    return (
      <Store>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Store>
    );
  }
}

export default App;
