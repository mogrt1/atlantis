import { action } from "../Context/Context";
import { set } from "idb-keyval";

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
