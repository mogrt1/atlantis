import React from 'react';
import './App.css';
import Store from './components/Store';
import Dpad from './components/Dpad/Dpad';

class App extends React.Component {
  render() {
    return (
      <Store>
        <Dpad></Dpad>
      </Store>
    );
  }
}

export default App;
