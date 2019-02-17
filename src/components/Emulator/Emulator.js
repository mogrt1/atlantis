import React from "react";

import EmulatorView from "./EmulatorView";

import * as actions from "../actions/emulatorActions";

import { settings } from "../../cores/GameBoy-Online/index";

const SMOOTHING = 13;
settings[SMOOTHING] = false;

const Emulator = props => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    actions.setCanvas(canvasRef);
  });

  return <EmulatorView canvasRef={canvasRef} />;
};

export default React.memo(Emulator, () => true);
