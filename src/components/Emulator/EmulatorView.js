import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const EmulatorView = (props)=> <canvas ref={props.canvasRef}></canvas>;

EmulatorView.propTypes = { canvasRef: PropTypes.object.isRequired };

export default pure(EmulatorView);
