import React from "react";
import PropTypes from "prop-types";

import EmulatorView from "./EmulatorView";

import { settings } from "../../cores/GameBoy-Online/index";

const SMOOTHING = 13;
settings[SMOOTHING] = false;

const Emulator = props => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    props.setCanvas(canvasRef);
  });

  return <EmulatorView canvasRef={this.canvasRef} />;
};

Emulator.propTypes = { setCanvas: PropTypes.func.isRequired };

export default React.memo(Emulator, () => true);
