import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';

import RewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';

import './Gamepad.css';
import Dpad from '../Dpad/Dpad';
import GamepadButton from '../GamepadButton';
import RewindButton from '../RewindButton';
import FastForwardButton from '../FastForwardButton';
import QuickMenu from '../QuickMenu/QuickMenu';
import TurboToggleButton from '../TurboToggleButton';

import { Consumer } from '../Context';

const GamepadView = ()=> (
  <Consumer>
    {({ state, actions })=> {
      const { ffToggle, ffRate, keyBindings } = state.settings;

      return (
        <div className={`Gamepad${(!state.settings.showOverlay && ` Gamepad-hide`) || ``}`}>
          <Dpad className="Gamepad-dpad" kb={keyBindings} />

          <GamepadButton
            className="Gamepad-b"
            type="B"
            kb={keyBindings[`settings-kb-b`]}
            turbo={state.turbo}
            turboKb={keyBindings[`settings-kb-b-turbo`]}
          >
            {`B`}
          </GamepadButton>
          <GamepadButton
            className="Gamepad-a"
            type="A"
            kb={keyBindings[`settings-kb-a`]}
            turbo={state.turbo}
            turboKb={keyBindings[`settings-kb-a-turbo`]}
          >
            {`A`}
          </GamepadButton>
          <GamepadButton className="Gamepad-start" type="START" kb={keyBindings[`settings-kb-start`]}>
            {`Start`}
          </GamepadButton>
          <GamepadButton className="Gamepad-select" type="SELECT" kb={keyBindings[`settings-kb-select`]}>
            {`Select`}
          </GamepadButton>

          {state.currentROM && <RewindButton
            className="Gamepad-rewind"
            kb={keyBindings[`settings-kb-rw`]}
            rewindQueue={state.rewindQueue}
          >
            <RewindIcon />
          </RewindButton>}

          <FastForwardButton
            className="Gamepad-fast-forward"
            kb={keyBindings[`settings-kb-ff`]}
            toggle={ffToggle === false ? ffToggle : true}
            rate={ffRate}
          >
            <FastForwardIcon />
          </FastForwardButton>

          {state.currentROM && <QuickMenu className="Gamepad-quick-menu" kb="q" />}

          <TurboToggleButton className="Gamepad-turbo" toggleTurbo={actions.toggleTurbo}>
            <sup>{`τ`}</sup>
          </TurboToggleButton>
        </div>
      );
    }}
  </Consumer>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
