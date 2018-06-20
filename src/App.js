import React from 'react';

import { get, keys } from 'idb-keyval';

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import Context, { Consumer } from './components/Context';
import Demo from './components/Demo';
import Gamepad from './components/Gamepad/GamepadView';
import Emulator from './components/Emulator/Emulator';
import Settings from './components/Settings/Settings';
import Library from './components/Library/Library';

import { persistValues } from './cores/GameBoy-Online/js/index';

const restoreData = async function() {
  const data = await keys();

  const valuesTx = [];

  for(const datum of data) {
    valuesTx.push(get(datum));
  }

  const values = await Promise.all(valuesTx);

  for(const [index, value] of values.entries()) {
    persistValues[data[index]] = value;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    restoreData();
  }

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
