import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsRewind } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import RewindIcon from '@material-ui/icons/FastRewind';

class SettingsRewind extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rewind: props.toggle };

    this.toggleRewind = ()=> {
      this.setState(
        { rewind: !this.state.rewind },

        ()=> {
          props.updateSetting(this.state.rewind);
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem className={classes.settingsItem} button onClick={this.toggleRewind}>
        <ListItemIcon>
          <RewindIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`Enable Rewind`}
        </ListItemText>
        <Switch checked={this.state.rewind} classes={{
          root: classes.toggleSwitch,
          checked: classes.toggleSwitchChecked
        }} />
      </ListItem>
    );
  }
}

SettingsRewind.propTypes = {
  classes: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  toggle: PropTypes.bool
};

export default styleSettingsRewind(SettingsRewind);
