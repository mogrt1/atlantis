import Spark from "spark-md5";
import { set } from "idb-keyval";

import { action } from "../Context/Context";
import { unzip, getBinaryString, buffersEqual, getThumbUri } from "../../utils";
import { games } from "../../db/gameboy.js";
import {
  gameboy,
  settings,
  start,
  openState
} from "../../cores/GameBoy-Online/index";

import * as soundActions from "./soundActions";

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

export const uploadGame = action(`UPLOAD_GAME`, (state, dispatch, e) => {
  dispatch();

  const getROM = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      const buffer = new Spark.ArrayBuffer();

      reader.onload = () => {
        unzip(reader.result).then(rom => {
          buffer.append(rom);

          if (buffer._length && rom.byteLength) {
            const md5 = buffer.end().toUpperCase();

            for (const { md5: libMd5 } of state.library) {
              if (md5 === libMd5) {
                return;
              }
            }

            const romData = {
              title: games[md5] || file.name.replace(/\.zip/gu, ``),
              md5,
              rom: reader.result
            };

            getThumbUri(romData.title).then(uri => {
              romData.thumb = uri;

              resolve(romData);
            });
          }
        });
      };

      reader.onerror = err => {
        reject(err);
      };

      reader.readAsArrayBuffer(file);
    });

  const roms = [];

  for (const file of e.target.files) {
    roms.push(getROM(file));
  }

  Promise.all(roms).then(results => {
    addToLibrary(results, () => {
      set(`games`, state.library);
    });
  });
});
