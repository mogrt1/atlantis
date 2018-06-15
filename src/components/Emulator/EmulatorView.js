import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { settings } from '../../cores/GameBoy-Online/js/index';

const RESIZE = 12;
const SMOOTHING = 13;

settings[RESIZE] = true;
settings[SMOOTHING] = false;

const EmulatorView = (props)=> <canvas
  className="Emulator-canvas"
  ref={props.canvasRef}
></canvas>;

EmulatorView.propTypes = { canvasRef: PropTypes.object.isRequired };

export default pure(EmulatorView);
