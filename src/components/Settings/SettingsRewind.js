import React from "react";
import { shouldUpdate } from "recompose";

import RewindIcon from "@material-ui/icons/FastRewind";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsRewind = () => (
  <SettingsControlToggle
    icon={<RewindIcon />}
    label="Enable Rewind"
    setting="enableRewind"
  />
);

export default shouldUpdate(() => false)(SettingsRewind);
