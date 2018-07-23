import React from 'react';
import PropTypes from 'prop-types';
import { shouldUpdate } from 'recompose';

import { styleEmulator } from './EmulatorStyles';

const EmulatorView = (props)=> {
  const { classes } = props;

  return (
    <canvas
      ref={props.canvasRef}
      className={classes.canvas}
      height="144"
      width="160"
    >
      {`Your client does not support this application. What are you using??`}
    </canvas>
  );
};

EmulatorView.propTypes = {
  canvasRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default shouldUpdate(()=> false)(styleEmulator(EmulatorView));
