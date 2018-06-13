import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { Consumer } from '../Store';
import Dpad from '../Dpad/Dpad';

const GamepadView = ()=> (
  <Consumer>
    {()=> (
      <div className="Gamepad">
        <Dpad />
      </div>
    )}
  </Consumer>
);

GamepadView.propTypes = {};

export default pure(GamepadView);
