import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsMute } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import {
  gameboy,
  settings
} from '../../cores/GameBoy-Online/js/index';

const SOUND = 0;

class SettingsMute extends React.Component {
  constructor(props) {
    super(props);

    this.state = { mute: props.toggle === false ? props.toggle : true };

    this.toggleMute = ()=> {
      this.setState(
        { mute: !this.state.mute },

        ()=> {
          props.updateSetting(this.state.mute);

          settings[SOUND] = !this.state.mute;

          if(gameboy) {
            if(this.state.mute) {
              gameboy.stopSound();
            } else {
              gameboy.initSound();
              props.enableAudio();
            }
          }
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem className={classes.settingsItem} button onClick={this.toggleMute}>
        <ListItemIcon>
          <VolumeOffIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`Mute`}
        </ListItemText>
        <Switch checked={this.state.mute} classes={{
          root: classes.toggleSwitch,
          checked: classes.toggleSwitchChecked
        }} />
      </ListItem>
    );
  }
}

SettingsMute.propTypes = {
  classes: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  enableAudio: PropTypes.func.isRequired,
  toggle: PropTypes.bool
};

export default styleSettingsMute(SettingsMute);
