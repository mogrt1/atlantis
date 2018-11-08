import React from 'react';

import { get, set, del, keys } from 'idb-keyval';

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../theme';
import { styleApp } from './AppStyles';

import Context, { Consumer } from '../Context/Context';
import FirstUse from '../FirstUse/FirstUse';
import Gamepad from '../Gamepad/GamepadView';
import Emulator from '../Emulator/Emulator';
import Sound from '../Sound';
import Settings from '../Settings/Settings';
import Library from '../Library/Library';
import Notification from '../Notification/Notification';
import Upgrade from '../Upgrade';

import { persistValues, saveValue } from '../../cores/GameBoy-Online/index';

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
  constructor(props) {
    super(props);

    this.handleNotificationClose = (action)=> (e)=> {
      action(e);
    };
  }

  componentDidMount() {
    const root = document.getElementById(`root`);

    root.addEventListener(`touchstart`, (e)=> {
      if(
        e.target.closest(`[class*="GamepadView"]`)
        || e.target.closest(`canvas`)
      ) {
        e.preventDefault();
      }
    }, { passive: false });

    root.addEventListener(`touchmove`, (e)=> e.preventDefault(), { passive: false });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Context restoreCoreData={restoreCoreData}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <Consumer>
            {({ state, actions })=> (
              <React.Fragment>
                {state.hydrated && state.settings.firstUse && <FirstUse />}
                <Emulator setCanvas={actions.setCanvas} />
                <Sound />
                <Gamepad />
                <Settings />
                <Library addToLibrary={actions.addToLibrary} />
                <Notification
                  autoHide={1000}
                  open={Boolean(state.message)}
                  onClose={this.handleNotificationClose(actions.hideMessage)}
                >
                  {state.message}
                </Notification>
              </React.Fragment>
            )}
          </Consumer>

          <Upgrade />
        </MuiThemeProvider>
      </Context>
    );
  }
}

export default React.memo(styleApp(App));
