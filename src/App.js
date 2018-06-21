import React from 'react';

import { get, set, del, keys } from 'idb-keyval';

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import Context, { Consumer } from './components/Context';
import Demo from './components/Demo';
import Gamepad from './components/Gamepad/GamepadView';
import Emulator from './components/Emulator/Emulator';
import Settings from './components/Settings/Settings';
import Library from './components/Library/Library';
import Loader from './components/Loader';

import { persistValues, saveValue } from './cores/GameBoy-Online/js/index';

const notCoreKeys = new Set([`games`, `settings`]);

const restoreCoreData = async function() {
  const data = await keys();

  const valuesTx = [];

  for(const datum of data) {
    valuesTx.push(get(datum));
  }

  const values = await Promise.all(valuesTx);

  for(const [index, datum] of data.entries()) {
    if(notCoreKeys.has(datum)) {
      continue;
    }

    persistValues[datum] = values[index];
  }
};

restoreCoreData();

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
      <Context>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <Consumer>
            {({ state, actions })=> (
              <React.Fragment>
                {!state.playingROM && <Demo />}
                <Emulator setCanvas={actions.setCanvas} />
                {state.playingROM && <Loader
                  rom={state.playingROM}
                  canvas={state.canvas.current}
                  setCurrentROM={actions.setCurrentROM}
                />}
                <Gamepad />
                <Settings />
                <Library addToLibrary={actions.addToLibrary} />
              </React.Fragment>
            )}
          </Consumer>
        </MuiThemeProvider>
      </Context>
    );
  }
}

export default App;
