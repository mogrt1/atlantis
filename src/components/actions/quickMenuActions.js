import { action } from "../Context/Context";
import { getBinaryString } from "../../utils";
import {
  start,
  saveState as emulatorSaveState,
  openState,
  GameBoyJoyPadEvent as gameBoyJoyPadEvent
} from "../../cores/GameBoy-Online/index";

import * as appActions from "./appActions";

export const saveState = action(`SAVE_STATE`, (state, dispatch) => {
  emulatorSaveState(`main`);
  appActions.showMessage(`Saved state.`);
  dispatch();
});

export const loadState = action(`LOAD_STATE`, async (state, dispatch) => {
  const stringROM = await getBinaryString(state.currentROM);
  openState(`main`, state.canvas.current, stringROM);
  appActions.showMessage(`Loaded state.`);
  dispatch();
});

export const abss = action(`ABSS`, (state, dispatch) => {
  const buttonCodes = {
    START: 7,
    SELECT: 6,
    A: 4,
    B: 5
  };

  for (const [, code] of Object.entries(buttonCodes)) {
    gameBoyJoyPadEvent(code, `pressed`);
  }

  const PRESSTIME = 500;
  setTimeout(() => {
    for (const [, code] of Object.entries(buttonCodes)) {
      gameBoyJoyPadEvent(code);
      dispatch();
    }
  }, PRESSTIME);
});

export const reset = action(`RESET`, async (state, dispatch) => {
  const stringROM = await getBinaryString(state.currentROM);
  start(state.canvas.current, new Uint8Array(state.currentROM), stringROM);
  dispatch();
});
