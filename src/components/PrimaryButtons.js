import React from 'react';

import GamepadButton from './GamepadButton';

class PrimaryButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GamepadButton
          className={classes.b}
          type="B"
          kb={keyBindings[`settings-kb-b`]}
          turbo={state.turbo}
          turboKb={keyBindings[`settings-kb-b-turbo`]}
        >
          {`B`}
        </GamepadButton>
        <GamepadButton
          className={classes.a}
          type="A"
          kb={keyBindings[`settings-kb-a`]}
          turbo={state.turbo}
          turboKb={keyBindings[`settings-kb-a-turbo`]}
        >
          {`A`}
        </GamepadButton>
      </React.Fragment>
    );
  }
}
