import React from "react";
import { shouldUpdate } from "recompose";

import VibrationIcon from "@material-ui/icons/Vibration";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsHaptics = () => (
  <SettingsControlToggle
    icon={<VibrationIcon />}
    label="Haptic Feedback"
    setting="haptics"
  />
);

export default shouldUpdate(() => false)(SettingsHaptics);
