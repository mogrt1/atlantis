import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import KeyboardIcon from "@material-ui/icons/Keyboard";

import { useSettingsKeyBindingsStyles } from "./SettingsStyles";

const bindingsDict = {
  b: `B`,
  a: `A`,
  "b-turbo": `B Turbo`,
  "a-turbo": `A Turbo`,
  start: `Start`,
  select: `Select`,
  up: `Up`,
  down: `Down`,
  left: `Left`,
  right: `Right`,
  rw: `Rewind`,
  ff: `Fast-Forward`,
  "save-state": `Save State`,
  "load-state": `Load State`,
  abss: `A+B+Start+Select`,
  reset: `Reset`
};

const SettingsKeyBindings = ({ keyBindings = {}, updateSetting }) => {
  const [open, setOpen] = React.useState(false);
  const [bindings, setBindings] = React.useState({ ...keyBindings });
  const classes = useSettingsKeyBindingsStyles();

  const handleBindingsToggle = () => {
    setOpen(!open);
  };

  const handleAssignKey = e => {
    e.stopPropagation();
    e.preventDefault();

    const value = e.key === ` ` ? `Spacebar` : e.key;

    const updatedBindings = { ...bindings };
    updatedBindings[e.target.id] = value;

    setBindings(updatedBindings);
    updateSetting(updatedBindings);
  };

  const Expand = open ? ExpandLess : ExpandMore;

  return (
    <>
      <ListItem
        button
        className={classes.settingsItem}
        onClick={handleBindingsToggle}
      >
        <ListItemIcon>
          <KeyboardIcon />
        </ListItemIcon>
        <ListItemText
          className={classes.itemText}
          primary="Keyboard Bindings"
        />
        <Expand className={classes.expand} />
      </ListItem>
      <Collapse
        className={classes.collapsibleList}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {Object.entries(bindingsDict).map(([id, label]) => (
            <ListItem key={id} className={classes.nested} dense>
              <TextField
                className={classes.input}
                id={`settings-kb-${id}`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{`key:`}</InputAdornment>
                  )
                }}
                label={label}
                margin="normal"
                onKeyDown={handleAssignKey}
                value={bindings[`settings-kb-${id}`]}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

SettingsKeyBindings.propTypes = {
  keyBindings: PropTypes.objectOf(PropTypes.string),
  updateSetting: PropTypes.func.isRequired
};

export default SettingsKeyBindings;
