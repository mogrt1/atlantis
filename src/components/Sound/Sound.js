import React from "react";

import Notification from "../Notification/Notification";
import { appContext } from "../Context/Context";
import * as soundActions from "../actions/soundActions";

const Sound = () => {
  const state = React.useContext(appContext);

  return (
    <Notification
      open={state.audioNeedsConfirmation}
      primaryAction={soundActions.enableAudio}
      secondaryLabel="Enable"
    >
      {`Tap to enable sound.`}
    </Notification>
  );
};

export default Sound;
