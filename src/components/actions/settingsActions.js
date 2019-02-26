import { set, del, keys } from "idb-keyval";

import { action } from "../Context/Context";
import { buffersEqual, getThumbUri, thumbIsUri } from "../../utils.js";
import { stop, persistValues } from "../../cores/GameBoy-Online/index";

export const updateSetting = key =>
  action(`UPDATE_SETTING_${key}`, (state, dispatch, value) => {
    const settings = {
      ...state.settings,
      [key]: value
    };

    dispatch({
      settings
    });

    set(`settings`, settings);
  });

export const deleteGame = action(`DELETE_GAME`, (state, dispatch, rom) => {
  let deletedGame = null;

  let { currentROM } = state;

  if (buffersEqual(currentROM, rom)) {
    currentROM = null;
    stop();
  }

  const updatedLibrary = state.library.filter(game => {
    if (buffersEqual(game.rom, rom)) {
      deletedGame = game;
      return false;
    }

    return true;
  });

  dispatch({
    library: updatedLibrary,
    currentROM
  });

  if (updatedLibrary.length) {
    set(`games`, updatedLibrary);
  } else {
    del(`games`);
  }

  if (!currentROM) {
    del(`currentROM`);
  }

  deleteSRAM(deletedGame.name);
  deleteSaveState(deletedGame.name, `main`);
  deleteSaveState(deletedGame.name, `auto`);
});

export const deleteSRAM = action(
  `DELETE_SRAM`,
  async (state, dispatch, name) => {
    const dataKeys = await keys();

    for (const key of dataKeys) {
      if (key === `SRAM_${name}`) {
        del(key);
        delete persistValues[key];
      }
    }

    dispatch();
  }
);

export const deleteSaveState = action(
  `DELETE_SAVE_STATE`,
  async (state, dispatch, name, slot) => {
    const dataKeys = await keys();

    for (const key of dataKeys) {
      if (key === `FREEZE_${name}_${slot}`) {
        del(key);
        delete persistValues[key];
      }
    }

    dispatch();
  }
);

export const retryThumbs = action(
  `RETRY_THUMBS`,
  (state, dispatch, library, force) => {
    // If we aren't forcing an update and don't need to do one, then don't.
    if (!force && !library.some(game => game.thumb === `reattempt`)) {
      return false;
    }

    // Create retries from given library.
    const retries = library.map(
      game =>
        new Promise(resolve => {
          // If we're forcing an update or game is marked for it.
          if (force || game.thumb === `reattempt`) {
            getThumbUri(game.title).then(thumb => {
              // If game's thumb is valid, but the network's isn't, don't update.
              if (thumbIsUri(game.thumb) && !thumbIsUri(thumb)) {
                resolve(game);
                return;
              }

              // If the game's thumb isn't valid or the network has a valid
              // replacement, update the thumb.
              if (
                !thumbIsUri(game.thumb) ||
                (thumbIsUri(game.thumb) && thumbIsUri(thumb))
              ) {
                game.thumb = thumb;
              }

              resolve(game);
            });
          } else {
            resolve(game);
          }
        })
    );

    // Fetch all applicable thumbs, then replace library in context and IDB.
    Promise.all(retries).then(updatedLibrary => {
      dispatch({ library: updatedLibrary });
      set(`games`, updatedLibrary);
    });
  }
);
