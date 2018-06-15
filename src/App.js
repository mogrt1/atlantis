import React from 'react';
import Store, { Consumer } from './components/Store';
// import Demo from './components/Demo';
import Gamepad from './components/Gamepad/GamepadView';
import Emulator from './components/Emulator/Emulator';
import Settings from './components/Settings/Settings';

class App extends React.Component {
  render() {
    return (
      <Store>
        <React.Fragment>
          {/* <Demo /> */}
          <Settings />
          <Gamepad />
          <Consumer>
            {(context)=> <Emulator setCanvas={context.actions.setCanvas} />}
          </Consumer>
        </React.Fragment>
      </Store>
    );
  }
}

export default App;
