import React from 'react';
import PropTypes from 'prop-types';

import { styleSettings } from './SettingsStyles';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon from '@material-ui/icons/Settings';

import SettingsFFRate from './SettingsFFRate';
import SettingsKeyBindings from './SettingsKeyBindings';

import { Consumer } from '../Context';

class Settings extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <React.Fragment>
            <IconButton
              color="inherit"
              aria-label="open settings"
              onClick={actions.toggleSettings}
              className={classes.open}
            >
              <SettingsIcon />
            </IconButton>

            <Drawer open={state.settingsOpen} onClose={actions.toggleSettings}>
              <div
                tabIndex={0}
                role="button"
              >
                <div className={classes.drawer}>
                  <List subheader={
                    <ListSubheader className={classes.heading}>
                    Settings
                    </ListSubheader>
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
        )}
      </Consumer>
    );
  }
}

Settings.propTypes = { classes: PropTypes.object.isRequired };

export default styleSettings(Settings);
