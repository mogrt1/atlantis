import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';

import FastForwardIcon from '@material-ui/icons/FastForward';

import './Gamepad.css';
import Dpad from '../Dpad/Dpad';
import GamepadButton from '../GamepadButton';
import FastForwardButton from '../FastForwardButton';
import QuickMenu from '../QuickMenu/QuickMenu';

import { Consumer } from '../Context';

const BOILERPLATE_FF = 3;

const GamepadView = ()=> (
  <Consumer>
    {({ state })=> {
      const { ffToggle, ffRate, keyBindings } = state.settings;

      return (
        <div className="Gamepad">
          <Dpad className="Gamepad-dpad" kb={keyBindings} />

          <GamepadButton className="Gamepad-b" type="B" kb={keyBindings[`settings-kb-b`]}>
            {`B`}
          </GamepadButton>
          <GamepadButton className="Gamepad-a" type="A" kb={keyBindings[`settings-kb-a`]}>
            {`A`}
          </GamepadButton>
          <GamepadButton className="Gamepad-start" type="START" kb={keyBindings[`settings-kb-start`]}>
            {`Start`}
          </GamepadButton>
          <GamepadButton className="Gamepad-select" type="SELECT" kb={keyBindings[`settings-kb-select`]}>
            {`Select`}
          </GamepadButton>

          <FastForwardButton
            className="Gamepad-fast-forward"
            kb={keyBindings[`settings-kb-ff`]}
            toggle={ffToggle === false ? ffToggle : true}
            rate={ffRate || BOILERPLATE_FF}
          >
            <FastForwardIcon />
          </FastForwardButton>

          <QuickMenu className="Gamepad-quick-menu" kb="q" />
        </div>
      );
    }}
  </Consumer>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
