import React from "react";
import PropTypes from "prop-types";

import { useSettingsToggleStyles } from "./SettingsStyles";

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch
} from "@material-ui/core";

import { appContext } from "../Context/Context";

const SettingsControlToggle = props => {
  const { state, actions } = React.useContext(appContext);
  const { label, icon, setting } = props;
  const classes = useSettingsToggleStyles();

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
  setting: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onChange: PropTypes.func
};

SettingsControlToggle.defaultProps = { onChange: null };

export default React.memo(SettingsControlToggle, () => true);
