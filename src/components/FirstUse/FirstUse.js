import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';
import {
  Settings as SettingsIcon,
  Link as LinkIcon
} from '@material-ui/icons';

import { styleFirstUse, styleLink } from './FirstUseStyles';

import SettingsShowOverlay from '../Settings/SettingsShowOverlay';

import { Consumer } from '../Context';

const Link = styleLink((props)=> (
  <ListItem
    button
    component="a"
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className={props.classes.link}
  >
    <ListItemIcon>
      <LinkIcon />
    </ListItemIcon>
    <ListItemText classes={{ root: props.classes.textRoot }}>
      {props.children}
    </ListItemText>
  </ListItem>
));

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

class FirstUse extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <Dialog
            className={classes.dialog}
            maxWidth="xs"
            aria-labelledby="first-use"
            scroll="body"
            open={state.settings.firstUse}
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
              <SettingsShowOverlay
                toggle={state.settings.showOverlay}
                updateSetting={actions.updateSetting(`showOverlay`)}
              />

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
                onClick={actions.firstUseComplete}
                variant="contained"
                className={classes.button}
              >
                {`Thanks`}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Consumer>);
  }
}

FirstUse.propTypes = { classes: PropTypes.object.isRequired };

export default styleFirstUse(FirstUse);
