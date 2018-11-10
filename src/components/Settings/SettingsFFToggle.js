import React from "react";
import { shouldUpdate } from "recompose";

import FastForwardIcon from "@material-ui/icons/FastForward";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsFFToggle = () => (
  <SettingsControlToggle
    icon={<FastForwardIcon />}
    label="FF Toggle"
    setting="ffToggle"
  />
);

export default shouldUpdate(() => false)(SettingsFFToggle);
