import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { Consumer } from '../Store';
import Dpad from '../Dpad/Dpad';
import GamepadButton from '../GamepadButton/GamepadButton';

const GamepadView = ()=> (
  <Consumer>
    {()=> (
      <div className="Gamepad">
        <Dpad />
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
      </div>
    )}
  </Consumer>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
