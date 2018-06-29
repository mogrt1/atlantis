import React from 'react';
// import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { Consumer } from './Context';

export default class Sound extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Consumer>
        {({ state, actions })=> (
          <Snackbar
            anchorOrigin={{
              vertical: `top`,
              horizontal: `center`
            }}
            open={state.audioNeedsConfirmation}
            ContentProps={{
              // className: classes.snackbar,
              'aria-describedby': `sound-message`
            }}
            message={<span id="sound-message">{state.message}</span>}
            action={
              <Button onClick={actions.enableAudio} size="small">
                {`Enable`}
              </Button>
            }
          />
        )}
      </Consumer>
    );
  }
}

Sound.propTypes = {};
