import React from "react";
import RewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import MenuIcon from "@material-ui/icons/Menu";

import Dpad from "../Dpad/Dpad";
import GamepadButton from "../GamepadButton/GamepadButton";
import RewindButton from "../SpecialButtons/RewindButton";
import FastForwardButton from "../SpecialButtons/FastForwardButton";
import QuickMenu from "../QuickMenu/QuickMenu";
import TurboToggleButton from "../SpecialButtons/TurboToggleButton";
import PrimaryButtons from "../PrimaryButtons/PrimaryButtons";
import { appContext } from "../Context/Context";
import * as appActions from "../actions/appActions";

import { useGamepadStyles } from "./GamepadStyles";

const GamepadView = props => {
  const state = React.useContext(appContext);
  const classes = useGamepadStyles();

  const { ffToggle, ffRate, keyBindings } = state.settings;

  return (
    <div
      className={`${classes.gamepad} ${(!state.settings.showOverlay &&
        classes.hide) ||
        ``}`}
    >
      <Dpad haptics={state.settings.haptics} kb={keyBindings} />

      <PrimaryButtons
        haptics={state.settings.haptics}
        kbA={keyBindings[`settings-kb-a`]}
        kbB={keyBindings[`settings-kb-b`]}
        turboKbA={keyBindings[`settings-kb-a-turbo`]}
        turboKbB={keyBindings[`settings-kb-b-turbo`]}
      />

      <GamepadButton
        className={classes.start}
        haptics={state.settings.haptics}
        kb={keyBindings[`settings-kb-start`]}
        type="START"
      >
        {`Start`}
      </GamepadButton>
      <GamepadButton
        className={classes.select}
        haptics={state.settings.haptics}
        kb={keyBindings[`settings-kb-select`]}
        type="SELECT"
      >
        {`Select`}
      </GamepadButton>

      {state.settings.enableRewind && state.currentROM && (
        <RewindButton
          className={classes.rewind}
          kb={keyBindings[`settings-kb-rw`]}
          rewindQueue={state.rewindQueue}
          showMessage={appActions.showMessage}
        >
          <RewindIcon className={classes.icon} />
        </RewindButton>
      )}

      <FastForwardButton
        className={classes.fastForward}
        kb={keyBindings[`settings-kb-ff`]}
        rate={ffRate}
        toggle={ffToggle === false ? ffToggle : true}
      >
        <FastForwardIcon className={classes.icon} />
      </FastForwardButton>

      {state.currentROM && (
        <QuickMenu className={classes.quickMenu} kb="q">
          <MenuIcon className={classes.icon} />
        </QuickMenu>
      )}

      <TurboToggleButton className={classes.turbo}>
        <sup>{`τ`}</sup>
      </TurboToggleButton>
    </div>
  );
};

export default React.memo(GamepadView, () => true);
