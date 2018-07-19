import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

import theme from '../theme';

import { Consumer } from './Context';

const styleSound = withStyles({
  snackbar: {
    paddingTop: `env(safe-area-inset-top)`,
    height: `calc(48px + env(safe-area-inset-top))`,
    color: theme.palette.getContrastText(theme.palette.primary[`800`]),
    background: theme.palette.background.paper,

    fallbacks: {
      paddingTop: 6,
      height: 48
    }
  },
  button: { color: theme.palette.secondary[`800`] }
});

class Sound extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <Snackbar
            onClick={actions.enableAudio}
            anchorOrigin={{
              vertical: `top`,
              horizontal: `center`
            }}
            open={state.audioNeedsConfirmation}
            ContentProps={{
              className: classes.snackbar,
              'aria-describedby': `sound-message`
            }}
            message={<span id="sound-message">
              {`Tap to enable sound.`}
            </span>}
            action={
              <Button
                size="small"
                className={classes.button}
              >
                {`Enable`}
              </Button>
            }
          />
        )}
      </Consumer>
    );
  }
}

Sound.propTypes = { classes: PropTypes.objectOf(PropTypes.string).isRequired };

export default styleSound(Sound);
