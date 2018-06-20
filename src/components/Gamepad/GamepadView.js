import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';

import FastForwardIcon from '@material-ui/icons/FastForward';

import './Gamepad.css';
import Dpad from '../Dpad/Dpad';
import GamepadButton from '../GamepadButton';
import FastForwardButton from '../FastForwardButton';
import QuickMenu from '../QuickMenu/QuickMenu';

const GamepadView = ()=> (
  <div className="Gamepad">
    <Dpad className="Gamepad-dpad" />
    <GamepadButton className="Gamepad-b" type="B" kb="z">
      {`B`}
    </GamepadButton>
    <GamepadButton className="Gamepad-a" type="A" kb="x">
      {`A`}
    </GamepadButton>
    <GamepadButton className="Gamepad-start" type="START" kb="Enter">
      {`Start`}
    </GamepadButton>
    <GamepadButton className="Gamepad-select" type="SELECT" kb="Shift">
      {`Select`}
    </GamepadButton>
    <FastForwardButton className="Gamepad-fast-forward" kb="`" toggle={true}>
      <FastForwardIcon />
    </FastForwardButton>
    <QuickMenu className="Gamepad-quick-menu" kb="q" />
  </div>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
