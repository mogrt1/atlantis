import React from 'react';

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import Context, { Consumer } from './components/Context';
import Demo from './components/Demo';
import Gamepad from './components/Gamepad/GamepadView';
import Emulator from './components/Emulator/Emulator';
import Settings from './components/Settings/Settings';
import Library from './components/Library/Library';

class App extends React.Component {
  render() {
    return (
      <Context>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <Demo />
          <Settings />
          <Library />
          <Gamepad />
          <Consumer>
            {(context)=> <Emulator setCanvas={context.actions.setCanvas} />}
          </Consumer>
        </MuiThemeProvider>
      </Context>
    );
  }
}

export default App;
