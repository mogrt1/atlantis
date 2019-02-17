import React from "react";
import { shouldUpdate } from "recompose";

import VolumeOffIcon from "@material-ui/icons/VolumeOff";

import SettingsControlToggle from "./SettingsControlToggle";

import * as soundActions from "../actions/soundActions";

import { gameboy, settings } from "../../cores/GameBoy-Online/index";

const SOUND = 0;

const onChange = muted => {
  settings[SOUND] = !muted;

  if (gameboy) {
    if (muted) {
      gameboy.stopSound();
    } else {
      gameboy.initSound();
    }

    soundActions.enableAudio();
  }
};

const SettingsMute = () => (
  <SettingsControlToggle
    icon={<VolumeOffIcon />}
    label="Mute"
    onChange={onChange}
    setting="mute"
  />
);

export default shouldUpdate(() => false)(SettingsMute);
