import { action } from "../Context/Context";

import { updateSetting } from "./settingsActions";

export const firstUseComplete = action(
  `FIRST_USE_COMPLETE`,
  (state, dispatch) => {
    updateSetting(`firstUse`)(false);
    dispatch({ libraryOpen: true });
  }
);
