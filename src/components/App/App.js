import React from "react";

import { get, set, del, keys } from "idb-keyval";

// import { MuiThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import theme from "../../theme";
import { useAppStyles } from "./AppStyles";

import Context, { appContext } from "../Context/Context";
import initialState from "./initialState";
// import FirstUse from "../FirstUse/FirstUse";
// import Gamepad from "../Gamepad/GamepadView";
// import Emulator from "../Emulator/Emulator";
// import Sound from "../Sound/Sound";
// import Settings from "../Settings/Settings";
// import Library from "../Library/Library";
// import Notification from "../Notification/Notification";
// import Upgrade from "../Upgrade";

import { persistValues, saveValue } from "../../cores/GameBoy-Online/index";

import * as actions from "../Context/testActions";

const notCoreKeys = new Set([`games`, `settings`, `currentROM`]);

const restoreCoreData = async function() {
  const dataKeys = await keys();

  const valuesTx = [];

  for (const key of dataKeys) {
    valuesTx.push(get(key));
  }

  const values = await Promise.all(valuesTx);

  for (const [index, key] of dataKeys.entries()) {
    if (notCoreKeys.has(key)) {
      continue;
    }

    persistValues[key] = values[index];
  }

  return true;
};

saveValue.subscribe((key, value) => {
  if (value === null) {
    del(key);
  } else {
    set(key, value);
  }
});

const handleNotificationClose = action => e => {
  action(e);
};

const useCustomTouchBehavior = () => {
  React.useEffect(() => {
    const root = document.getElementById(`root`);

    root.addEventListener(
      `touchstart`,
      e => {
        if (
          e.target.closest(`[class*="GamepadView"]`) ||
          e.target.closest(`canvas`)
        ) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    root.addEventListener(`touchmove`, e => e.preventDefault(), {
      passive: false
    });
  }, []);
};

const Test = () => {
  const context = React.useContext(appContext);

  React.useEffect(() => {
    setTimeout(() => actions.testAction(`bar`), 1000);
  }, []);

  return <div>{context.test || `foo`}</div>;
};

const App = () => {
  useCustomTouchBehavior();
  useAppStyles();

  // const { state, actions } = React.useContext(appContext);

  return (
    <Context initialState={initialState} restoreCoreData={restoreCoreData}>
      <Test />
      {/* <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {state.hydrated && state.settings.firstUse && <FirstUse />}
        <Emulator />
        <Sound />
        <Gamepad />
        <Settings />
        <Library addToLibrary={actions.addToLibrary} />
        <Notification
          autoHide={1000}
          open={Boolean(state.message)}
          onClose={handleNotificationClose(actions.hideMessage)}
        >
          {state.message}
        </Notification>

        <Upgrade />
      </MuiThemeProvider> */}
    </Context>
  );
};

export default React.memo(App, () => true);
