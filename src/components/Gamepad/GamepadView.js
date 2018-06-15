import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';

import FastForwardIcon from '@material-ui/icons/FastForward';

import './Gamepad.css';
import Dpad from '../Dpad/Dpad';
import GamepadButton from '../GamepadButton';
import FastForwardButton from '../FastForwardButton';

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
    <FastForwardButton className="Gamepad-fast-forward" kb="`">
      <FastForwardIcon />
    </FastForwardButton>
  </div>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
