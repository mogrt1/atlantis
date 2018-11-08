import React from 'react';

import Notification from './Notification/Notification';

import { appContext } from './Context/Context';

const Sound = ()=> {
  const { state, actions } = React.useContext(appContext);

  return (
    <Notification
      open={state.audioNeedsConfirmation}
      primaryAction={actions.enableAudio}
      secondaryLabel="Enable"
    >
      {`Tap to enable sound.`}
    </Notification>
  );
};

export default Sound;
