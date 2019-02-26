import React from "react";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

import * as soundActions from "../actions/soundActions";
import { gameboy, settings } from "../../cores/GameBoy-Online/index";

import SettingsControlToggle from "./SettingsControlToggle";

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

export default React.memo(SettingsMute, () => true);
