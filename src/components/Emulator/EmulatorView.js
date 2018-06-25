import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const EmulatorView = (props)=> <canvas
  className="Emulator-canvas"
  ref={props.canvasRef}
  width="160"
  height="144"
></canvas>;

EmulatorView.propTypes = { canvasRef: PropTypes.object.isRequired };

export default pure(EmulatorView);
