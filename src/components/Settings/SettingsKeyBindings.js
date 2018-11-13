import React from "react";
import PropTypes from "prop-types";

import { styleSettingsKeyBindings } from "./SettingsStyles";

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

class SettingsKeyBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      ...props.keyBindings
    };

    this.bindings = {
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

    this.handleBindingsToggle = () => {
      this.setState(prevState => ({ open: !prevState.open }));
    };

    this.handleAssignKey = e => {
      e.stopPropagation();
      e.preventDefault();

      const value = e.key === ` ` ? `Spacebar` : e.key;

      this.setState(
        { [e.target.id]: value },

        () => {
          const { open, ...bindings } = this.state;

          props.updateSetting(bindings);
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    const Expand = this.state.open ? ExpandLess : ExpandMore;

    return (
      <>
        <ListItem
          button
          className={classes.settingsItem}
          onClick={this.handleBindingsToggle}
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
          in={this.state.open}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {Object.entries(this.bindings).map(([id, label]) => (
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
                  onKeyDown={this.handleAssignKey}
                  value={this.state[`settings-kb-${id}`]}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }
}

SettingsKeyBindings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  keyBindings: PropTypes.objectOf(PropTypes.string),
  updateSetting: PropTypes.func.isRequired
};

SettingsKeyBindings.defaultProps = { keyBindings: {} };

export default styleSettingsKeyBindings(SettingsKeyBindings);
