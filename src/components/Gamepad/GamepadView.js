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
        <GamepadButton type="B" key="z">
          {`B`}
        </GamepadButton>
        <GamepadButton type="A" key="x">
          {`A`}
        </GamepadButton>
        <GamepadButton type="START" key="Enter">
          {`Start`}
        </GamepadButton>
        <GamepadButton type="SELECT" key="Shift">
          {`Select`}
        </GamepadButton>
      </div>
    )}
  </Consumer>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
