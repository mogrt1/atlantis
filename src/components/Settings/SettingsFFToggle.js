import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsFFToggle } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import FastForwardIcon from '@material-ui/icons/FastForward';

class SettingsFFToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggle: true };

    this.toggleToggle = ()=> {
      this.setState({ toggle: !this.state.toggle });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem button onClick={this.toggleToggle}>
        <ListItemIcon>
          <FastForwardIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`FF Toggle`}
        </ListItemText>
        <Switch checked={this.state.toggle} classes={{
          root: classes.toggleSwitch,
          checked: classes.toggleSwitchChecked
        }} />
      </ListItem>
    );
  }
}

SettingsFFToggle.propTypes = { classes: PropTypes.object.isRequired };

export default styleSettingsFFToggle(SettingsFFToggle);
