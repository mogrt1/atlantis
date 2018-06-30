import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { styleEmulator } from './EmulatorStyles';

const EmulatorView = (props)=> {
  const { classes } = props;

  return (
    <canvas
      className={classes.canvas}
      ref={props.canvasRef}
      width="160"
      height="144"
    ></canvas>
  );
};

EmulatorView.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default pure(styleEmulator(EmulatorView));
