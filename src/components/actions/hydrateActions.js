import { get } from "idb-keyval";

import { action } from "../Context/Context";
import initialState from "../../initialState";

import * as settingsActions from "./settingsActions";
import * as libraryActions from "./libraryActions";

const defaultSettings = initialState.settings;

export const hydrateSavedSettings = action(
  `HYDRATE_SAVED_SETTINGS`,
  (state, dispatch) => {
    get(`settings`).then(
      (savedSettings = JSON.parse(JSON.stringify(defaultSettings))) => {
        dispatch({
          hydrated: true,
          settings: {
            ...state.settings,
            ...savedSettings
          }
        });
      }
    );

    // Reattempt thumb downloads that could not be completed while offline.
    get(`games`).then((library = []) => {
      settingsActions.retryThumbs(library);
    });

    // Load last-played game.
    get(`currentROM`).then(currentROM => {
      if (currentROM) {
        libraryActions.setCurrentROM(currentROM);
      }
    });
  }
);
