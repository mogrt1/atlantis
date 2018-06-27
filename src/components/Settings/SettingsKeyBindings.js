import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsKeyBindings } from './SettingsStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardIcon from '@material-ui/icons/Keyboard';

class SettingsKeyBindings extends React.Component {
  constructor(props) {
    super(props);

    const keyBindings = props.keyBindings || {};

    this.state = {
      open: false,
      ...keyBindings
    };

    this.bindings = {
      'b': `B`,
      'a': `A`,
      'b-turbo': `B Turbo`,
      'a-turbo': `A Turbo`,
      'start': `Start`,
      'select': `Select`,
      'up': `Up`,
      'down': `Down`,
      'left': `Left`,
      'right': `Right`,
      'rw': `Rewind`,
      'ff': `Fast-Forward`,
      'save-state': `Save State`,
      'load-state': `Load State`,
      'abss': `A+B+Start+Select`,
      'reset': `Reset`
    };

    this.toggleBindings = ()=> {
      this.setState({ open: !this.state.open });
    };

    this.assignKey = (e)=> {
      e.stopPropagation();
      e.preventDefault();

      const value = e.key === ` ` ? `Spacebar` : e.key;

      this.setState(
        { [e.target.id]: value },

        ()=> {
          const bindings = { ...this.state };
          delete bindings.open;

          props.updateSetting(bindings);
        }
      );
    };
  }

  render() {
    const { classes } = this.props;

    const Expand = this.state.open ? ExpandLess : ExpandMore;

    return (
      <React.Fragment>
        <ListItem button onClick={this.toggleBindings}>
          <ListItemIcon>
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText primary="Keyboard Bindings" className={classes.itemText} />
          <Expand className={classes.expand} />
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Object.entries(this.bindings).map(([id, label])=> (
              <ListItem key={id} className={classes.nested} dense>
                <TextField
                  id={`settings-kb-${id}`}
                  className={classes.input}
                  label={label}
                  value={this.state[`settings-kb-${id}`]}
                  onKeyDown={this.assignKey}
                  margin="normal"
                  InputProps={{ startAdornment: <InputAdornment position="start">key:</InputAdornment> }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

SettingsKeyBindings.propTypes = {
  classes: PropTypes.object.isRequired,
  keyBindings: PropTypes.object,
  updateSetting: PropTypes.func.isRequired
};

export default styleSettingsKeyBindings(SettingsKeyBindings);
