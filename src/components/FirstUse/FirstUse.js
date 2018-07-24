import React from 'react';
import PropTypes from 'prop-types';

import { styleFirstUse } from './FirstUseStyles';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import { SettingsRounded as SettingsIcon } from '@material-ui/icons';

import SettingsShowOverlay from '../Settings/SettingsShowOverlay';
import Link from '../Link/Link';

import { Consumer } from '../Context';

class FirstUse extends React.Component {
  constructor(props) {
    super(props);

    this.handleDone = (action)=> (e)=> {
      action(e);
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <Dialog
            aria-labelledby="first-use"
            className={classes.dialog}
            maxWidth="xs"
            open={state.settings.firstUse}
            scroll="body"
          >
            <DialogTitle id="first-use">
              {`Welcome`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.bodyText}>
                {`
                  The Atlantis emulator is made for all devices.
                  Before continuing, please choose whether you want to use the touch control
                  overlay (you can always change this in Settings
                `}
                {<SettingsIcon className={classes.inlineIcon} />}
                {`).`}
              </DialogContentText>
              <SettingsShowOverlay />

              <DialogContentText className={classes.bodyText}>
                {`
                  On many platforms, you can add Atlantis to the homescreen.
                  It isn't necessary, but you might like it better.
                `}
              </DialogContentText>
              <Link href="https://lifehacker.com/5809338/add-web-site-bookmarks-to-your-iphones-homescreen">
                {`iOS Safari`}
              </Link>
              <Link href="https://youtu.be/t8vjwzMQad8">
                {`Android Chrome`}
              </Link>
              <Link href="https://www.laptopmag.com/articles/pin-website-windows-10-start">
                {`Windows Edge`}
              </Link>
              <Link href="https://support.google.com/chromebook/answer/3113576">
                {`Chrome OS`}
              </Link>
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.button}
                onClick={this.handleDone(actions.firstUseComplete)}
                variant="contained"
              >
                {`Thanks`}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Consumer>);
  }
}

FirstUse.propTypes = { classes: PropTypes.objectOf(PropTypes.string).isRequired };

export default styleFirstUse(FirstUse);
