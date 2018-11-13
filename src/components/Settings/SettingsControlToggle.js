import React from "react";
import PropTypes from "prop-types";

import { styleSettingsToggle } from "./SettingsStyles";

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch
} from "@material-ui/core";

import { appContext } from "../Context/Context";

const SettingsControlToggle = props => {
  const { state, actions } = React.useContext(appContext);
  const { classes, label, icon, setting } = props;

  const handleToggle = (updateSetting, value, actions) => () => {
    updateSetting(!value);

    if (props.onChange) {
      props.onChange(!value, actions);
    }
  };

  return (
    <ListItem
      button
      className={classes.settingsItem}
      onClick={handleToggle(
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
  );
};

SettingsControlToggle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  setting: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onChange: PropTypes.func
};

SettingsControlToggle.defaultProps = { onChange: null };

export default React.memo(
  styleSettingsToggle(SettingsControlToggle),
  () => true
);
