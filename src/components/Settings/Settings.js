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
  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <React.Fragment>
            <IconButton
              color="inherit"
              aria-label="open settings"
              onClick={actions.toggleDrawer(`settings`)}
              className={classes.open}
            >
              <SettingsIcon />
            </IconButton>

            <Drawer open={state.settingsOpen} onClose={actions.toggleDrawer(`settings`)}>
              <div
                tabIndex={0}
                role="button"
              >
                <div className={classes.drawer}>
                  <List subheader={
                    <ListSubheader className={classes.heading}>
                      {`Settings`}
                    </ListSubheader>
                  }>
                    <div>
                      <SettingsMute
                        toggle={state.settings.mute}
                        updateSetting={actions.updateSetting(`mute`)}
                        enableAudio={actions.enableAudio}
                      />
                      <SettingsHaptics
                        toggle={state.settings.haptics}
                        updateSetting={actions.updateSetting(`haptics`)}
                      />
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
                        library={state.library}
                        deleteGame={actions.deleteGame}
                        deleteSRAM={actions.deleteSRAM}
                        deleteSaveState={actions.deleteSaveState}
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
                        Report a Bug
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

Settings.propTypes = { classes: PropTypes.object.isRequired };

export default styleSettings(Settings);
