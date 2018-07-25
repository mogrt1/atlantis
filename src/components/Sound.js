import React from 'react';

import Notification from './Notification/Notification';

import { Consumer } from './Context';

const Sound = ()=> (
  <Consumer>
    {({ state, actions })=> (
      <Notification
        open={state.audioNeedsConfirmation}
        primaryAction={actions.enableAudio}
        secondaryLabel="Enable"
      >
        {`Tap to enable sound.`}
      </Notification>
    )}
  </Consumer>
);

export default Sound;
