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
import * as settingsActions from "../actions/settingsActions";

const SettingsControlToggle = props => {
  const state = React.useContext(appContext);
  const { label, icon, setting } = props;
  const classes = useSettingsToggleStyles();

  const handleToggle = (updateSetting, value) => () => {
    updateSetting(!value);

    if (props.onChange) {
      props.onChange(!value);
    }
  };

  return (
    <ListItem
      button
      className={classes.settingsItem}
      onClick={handleToggle(
        settingsActions.updateSetting(setting),
        state.settings[setting]
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
