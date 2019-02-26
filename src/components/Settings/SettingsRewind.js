import React from "react";
import RewindIcon from "@material-ui/icons/FastRewind";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsRewind = () => (
  <SettingsControlToggle
    icon={<RewindIcon />}
    label="Enable Rewind"
    setting="enableRewind"
  />
);

export default React.memo(SettingsRewind, () => true);
