import React from "react";

import * as emulatorActions from "../actions/emulatorActions";
import { settings } from "../../cores/GameBoy-Online/index";

import EmulatorView from "./EmulatorView";

const SMOOTHING = 13;
settings[SMOOTHING] = false;

const Emulator = props => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    emulatorActions.setCanvas(canvasRef);
  });

  return <EmulatorView canvasRef={canvasRef} />;
};

export default React.memo(Emulator, () => true);
