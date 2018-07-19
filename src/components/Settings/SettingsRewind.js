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
        (prevState)=> ({ rewind: !prevState.rewind }),

        ()=> {
          props.updateSetting(this.state.rewind);
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem
        button className={classes.settingsItem}
        onClick={this.toggleRewind}
      >
        <ListItemIcon>
          <RewindIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`Enable Rewind`}
        </ListItemText>
        <Switch
          checked={this.state.rewind}
          classes={{
            root: classes.toggleSwitch,
            checked: classes.toggleSwitchChecked
          }}
        />
      </ListItem>
    );
  }
}

SettingsRewind.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  updateSetting: PropTypes.func.isRequired,
  toggle: PropTypes.bool
};

SettingsRewind.defaultProps = { toggle: null };

export default styleSettingsRewind(SettingsRewind);
