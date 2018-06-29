import React from 'react';

import { get, set, del, keys } from 'idb-keyval';

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import Context, { Consumer } from './components/Context';
// import Demo from './components/Demo';
import Gamepad from './components/Gamepad/GamepadView';
import Emulator from './components/Emulator/Emulator';
import Sound from './components/Sound';
import Settings from './components/Settings/Settings';
import Library from './components/Library/Library';

import { persistValues, saveValue } from './cores/GameBoy-Online/js/index';

const notCoreKeys = new Set([`games`, `settings`, `currentROM`]);

const restoreCoreData = async function() {
  const dataKeys = await keys();

  const valuesTx = [];

  for(const key of dataKeys) {
    valuesTx.push(get(key));
  }

  const values = await Promise.all(valuesTx);

  for(const [index, key] of dataKeys.entries()) {
    if(notCoreKeys.has(key)) {
      continue;
    }

    persistValues[key] = values[index];
  }

  return true;
};

saveValue.subscribe((key, value)=> {
  if(value === null) {
    del(key);
  } else {
    set(key, value);
  }
});

class App extends React.Component {
  render() {
    return (
      <Context restoreCoreData={restoreCoreData}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <Consumer>
            {/* {({ state, actions })=> ( */}
            {(context)=> (
              <React.Fragment>
                {/* {!state.currentROM && <Demo />} */}
                <Emulator setCanvas={context.actions.setCanvas} />
                <Sound />
                <Gamepad />
                <Settings />
                <Library addToLibrary={context.actions.addToLibrary} />
              </React.Fragment>
            )}
          </Consumer>
        </MuiThemeProvider>
      </Context>
    );
  }
}

export default App;
