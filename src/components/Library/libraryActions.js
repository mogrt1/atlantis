import { action } from "../Context/Context";
import * as soundActions from "../Sound/soundActions";

import { set } from "idb-keyval";
import { unzip, getBinaryString, buffersEqual } from "../../utils";

import {
  gameboy,
  settings,
  start,
  openState
} from "../../cores/GameBoy-Online/index";

const SOUND = 0;

export const setCurrentROM = action(
  `SET_CURRENT_ROM`,
  async (state, dispatch, arrayBuffer) => {
    const unzippedROM = arrayBuffer;

    const currentROM = await unzip(unzippedROM);

    const stringROM = await getBinaryString(currentROM);

    dispatch({
      currentROM,
      libraryOpen: false,
      rewindQueue: []
    });

    settings[SOUND] = !state.settings.mute;

    start(state.canvas.current, new Uint8Array(currentROM), stringROM);

    soundActions.enableAudio();

    const library = [...state.library];

    for (const game of library) {
      if (buffersEqual(game.rom, unzippedROM)) {
        if (!(`name` in game)) {
          game.name = gameboy.name;

          set(`games`, library);

          dispatch({ library });
        }

        break;
      }
    }

    // Load autosave.
    openState(`auto`, state.canvas.current, stringROM);

    set(`currentROM`, currentROM);
  }
);

export const addToLibrary = action(`ADD_TO_LIBRARY`, (state, dispatch, ROM) => {
  if (!ROM.length) {
    return;
  }

  const roms = Array.isArray(ROM) ? ROM : [ROM];

  for (const rom of roms) {
    const { md5 } = rom;

    for (const { md5: libMd5 } of state.library) {
      if (md5 === libMd5) {
        return;
      }
    }
  }

  dispatch({
    library: [...state.library, ...roms]
  });
});
