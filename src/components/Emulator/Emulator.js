import React from 'react';
import PropTypes from 'prop-types';

import EmulatorView from './EmulatorView';

export default class Emulator extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    props.setCanvas(this.canvasRef);
  }

  render() {
    return (
      <EmulatorView canvasRef={this.canvasRef}></EmulatorView>
    );
  }
}

Emulator.propTypes = { setCanvas: PropTypes.func.isRequired };
