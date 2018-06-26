import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsShowOverlay } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

class SettingsShowOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggle: props.toggle === false ? props.toggle : true };

    this.overlayToggle = ()=> {
      this.setState(
        { toggle: !this.state.toggle },

        ()=> {
          props.updateSetting(this.state.toggle);
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem button onClick={this.overlayToggle}>
        <ListItemIcon>
          <VideogameAssetIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`Touch Overlay`}
        </ListItemText>
        <Switch checked={this.state.toggle} classes={{
          root: classes.toggleSwitch,
          checked: classes.toggleSwitchChecked
        }} />
      </ListItem>
    );
  }
}

SettingsShowOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  toggle: PropTypes.bool
};

export default styleSettingsShowOverlay(SettingsShowOverlay);
