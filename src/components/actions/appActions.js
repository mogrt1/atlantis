import { action } from "../Context/Context";
import {
  pause,
  run,
  GameBoyEmulatorInitialized as gameBoyEmulatorInitialized
} from "../../cores/GameBoy-Online/index";

export const toggleDrawer = drawerName =>
  action(`TOGGLE_DRAWER`, (state, dispatch) => {
    const shouldOpen = !state[`${drawerName}Open`];

    dispatch({
      [`${drawerName}Open`]: shouldOpen
    });

    if (!gameBoyEmulatorInitialized()) {
      return;
    }

    if (shouldOpen) {
      pause();
    } else {
      run();
    }
  });

export const showMessage = action(
  `SHOW_MESSAGE`,
  (state, dispatch, message) => {
    dispatch({ message });
  }
);

export const hideMessage = action(`HIDE_MESSAGE`, (state, dispatch) => {
  dispatch({ message: `` });
});
