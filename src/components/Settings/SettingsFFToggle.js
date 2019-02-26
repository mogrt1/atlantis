import React from "react";
import FastForwardIcon from "@material-ui/icons/FastForward";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsFFToggle = () => (
  <SettingsControlToggle
    icon={<FastForwardIcon />}
    label="FF Toggle"
    setting="ffToggle"
  />
);

export default React.memo(SettingsFFToggle, () => true);
