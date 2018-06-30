import React from 'react';
import PropTypes from 'prop-types';

import EmulatorView from './EmulatorView';

import { settings } from '../../cores/GameBoy-Online/js/index';

const SMOOTHING = 13;
settings[SMOOTHING] = false;

export default class Emulator extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.props.setCanvas(this.canvasRef);
  }

  render() {
    return (
      <EmulatorView canvasRef={this.canvasRef}></EmulatorView>
    );
  }
}

Emulator.propTypes = { setCanvas: PropTypes.func.isRequired };
