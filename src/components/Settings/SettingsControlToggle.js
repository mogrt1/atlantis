import React from "react";
import PropTypes from "prop-types";

import { styleSettingsToggle } from "./SettingsStyles";

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch
} from "@material-ui/core";

import { Consumer } from "../Context/Context";

class SettingsControlToggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = (updateSetting, value, actions) => () => {
      updateSetting(!value);

      if (props.onChange) {
        props.onChange(!value, actions);
      }
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { classes, label, icon, setting } = this.props;

    return (
      <Consumer>
        {({ state, actions }) => (
          <ListItem
            button
            className={classes.settingsItem}
            onClick={this.handleToggle(
              actions.updateSetting(setting),
              state.settings[setting],
              actions
            )}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText className={classes.itemText}>{label}</ListItemText>
            <Switch
              checked={state.settings[setting]}
              classes={{
                root: classes.toggleSwitch,
                checked: classes.toggleSwitchChecked
              }}
            />
          </ListItem>
        )}
      </Consumer>
    );
  }
}

SettingsControlToggle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  setting: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onChange: PropTypes.func
};

SettingsControlToggle.defaultProps = { onChange: null };

export default styleSettingsToggle(SettingsControlToggle);
