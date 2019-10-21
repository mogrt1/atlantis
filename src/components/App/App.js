import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../../theme";
import { appContext } from "../Context/Context";
import Hydrate from "../Hydrate/Hydrate";
import FirstUse from "../FirstUse/FirstUse";
import Gamepad from "../Gamepad/GamepadView";
import Emulator from "../Emulator/Emulator";
import Sound from "../Sound/Sound";
import Settings from "../Settings/Settings";
import Library from "../Library/Library";
import Notification from "../Notification/Notification";
import Upgrade from "../Upgrade/Upgrade";
import * as appActions from "../actions/appActions";

import { useAppStyles } from "./AppStyles";

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

const App = () => {
  useCustomTouchBehavior();
  useAppStyles();

  const state = React.useContext(appContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Hydrate />
      {state.hydrated && state.settings.firstUse && <FirstUse />}
      <Emulator />
      <Sound />
      <Gamepad />
      <Settings />
      <Library />
      <Notification
        autoHide={1000}
        open={Boolean(state.message)}
        onClose={appActions.hideMessage}
      >
        {state.message}
      </Notification>

      <Upgrade />
    </ThemeProvider>
  );
};

export default App;
