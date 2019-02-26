import React from "react";
import VibrationIcon from "@material-ui/icons/Vibration";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsHaptics = () => (
  <SettingsControlToggle
    icon={<VibrationIcon />}
    label="Haptic Feedback"
    setting="haptics"
  />
);

export default React.memo(SettingsHaptics, () => true);
