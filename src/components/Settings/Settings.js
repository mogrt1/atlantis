import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  open as styleOpen,
  drawer as styleDrawer,
  heading as styleHeading
} from './SettingsStyles';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';

import SettingsFFRate from './SettingsFFRate';
import SettingsKeyBindings from './SettingsKeyBindings';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggleSettings = ()=> {
      this.setState({ open: !this.state.open });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <IconButton
          color="inherit"
          aria-label="open settings"
          onClick={this.toggleSettings}
          className={classes.open}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={this.state.open} onClose={this.toggleSettings}>
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.drawer}>
              <List subheader={
                <ListSubheader className={classes.heading}>Settings</ListSubheader>
              }>
                <div>
                  <SettingsFFRate />
                  <SettingsKeyBindings />
                </div>
              </List>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

Settings.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles({
  open: styleOpen,
  drawer: styleDrawer,
  heading: styleHeading
})(Settings);
