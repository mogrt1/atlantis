import React from 'react';
import PropTypes from 'prop-types';

import EmulatorView from './EmulatorView';
import './Emulator.css';

import { settings, initNewCanvasSize } from '../../cores/GameBoy-Online/js/index';

const SOUND = true;
const RESIZE = 12;
const SMOOTHING = 13;

settings[SOUND] = false;
settings[RESIZE] = true;
settings[SMOOTHING] = false;

export default class Emulator extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.props.setCanvas(this.canvasRef);

    window.addEventListener(`resize`, ()=> {
      initNewCanvasSize();
    });
  }

  render() {
    return (
      <EmulatorView canvasRef={this.canvasRef}></EmulatorView>
    );
  }
}

Emulator.propTypes = { setCanvas: PropTypes.func.isRequired };
