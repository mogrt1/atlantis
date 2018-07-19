import React from 'react';
import PropTypes from 'prop-types';

import { styleSettings } from './SettingsStyles';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon from '@material-ui/icons/Settings';

import SettingsMute from './SettingsMute';
import SettingsHaptics from './SettingsHaptics';
import SettingsFFRate from './SettingsFFRate';
import SettingsFFToggle from './SettingsFFToggle';
import SettingsRewind from './SettingsRewind';
import SettingsManageData from './SettingsManageData';
import SettingsShowOverlay from './SettingsShowOverlay';
import SettingsKeyBindings from './SettingsKeyBindings';
import Link from '../Link/Link';

import { Consumer } from '../Context';

class Settings extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <React.Fragment>
            <IconButton
              aria-label="open settings"
              className={classes.open}
              color="inherit"
              onClick={actions.toggleDrawer(`settings`)}
            >
              <SettingsIcon />
            </IconButton>

            <Drawer onClose={actions.toggleDrawer(`settings`)} open={state.settingsOpen}>
              <div
                role="button"
                tabIndex={0}
              >
                <div className={classes.drawer}>
                  <List subheader={
                    <ListSubheader className={classes.heading}>
                      {`Settings`}
                    </ListSubheader>
                  }>
                    <div>
                      <SettingsMute
                        enableAudio={actions.enableAudio}
                        toggle={state.settings.mute}
                        updateSetting={actions.updateSetting(`mute`)}
                      />
                      {`vibrate` in window.navigator && <SettingsHaptics
                        toggle={state.settings.haptics}
                        updateSetting={actions.updateSetting(`haptics`)}
                      />}
                      <SettingsFFRate
                        rate={state.settings.ffRate}
                        updateSetting={actions.updateSetting(`ffRate`)}
                      />
                      <SettingsFFToggle
                        toggle={state.settings.ffToggle}
                        updateSetting={actions.updateSetting(`ffToggle`)}
                      />
                      <SettingsRewind
                        toggle={state.settings.enableRewind}
                        updateSetting={actions.updateSetting(`enableRewind`)}
                      />
                      <SettingsManageData
                        deleteGame={actions.deleteGame}
                        deleteSaveState={actions.deleteSaveState}
                        deleteSRAM={actions.deleteSRAM}
                        library={state.library}
                      />
                      <SettingsShowOverlay
                        toggle={state.settings.showOverlay}
                        updateSetting={actions.updateSetting(`showOverlay`)}
                      />
                      <SettingsKeyBindings
                        keyBindings={state.settings.keyBindings}
                        updateSetting={actions.updateSetting(`keyBindings`)}
                      />
                      <Link error href="https://github.com/brianblakely/atlantis/issues/new?template=bug-report.md">
                        {`Report a Bug`}
                      </Link>
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

Settings.propTypes = { classes: PropTypes.objectOf(PropTypes.string).isRequired };

export default styleSettings(Settings);
