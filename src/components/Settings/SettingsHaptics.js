import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsHaptics } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import VibrationIcon from '@material-ui/icons/Vibration';

class SettingsHaptics extends React.Component {
  constructor(props) {
    super(props);

    this.state = { haptics: props.toggle };

    this.toggleHaptics = ()=> {
      this.setState(
        { haptics: !this.state.haptics },

        ()=> {
          props.updateSetting(this.state.haptics);
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem className={classes.settingsItem} button onClick={this.toggleHaptics}>
        <ListItemIcon>
          <VibrationIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`Haptic Feedback`}
        </ListItemText>
        <Switch checked={this.state.haptics} classes={{
          root: classes.toggleSwitch,
          checked: classes.toggleSwitchChecked
        }} />
      </ListItem>
    );
  }
}

SettingsHaptics.propTypes = {
  classes: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  toggle: PropTypes.bool
};

export default styleSettingsHaptics(SettingsHaptics);
