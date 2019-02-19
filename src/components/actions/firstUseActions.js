import { action } from "../Context/Context";

import * as settingsActions from "./settingsActions";

export const firstUseComplete = action(
  `FIRST_USE_COMPLETE`,
  (state, dispatch) => {
    settingsActions.updateSetting(`firstUse`)(false);
    dispatch({ libraryOpen: true });
  }
);
