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
      'b': {
        default: `z`,
        label: `B`
      },
      'a': {
        default: `x`,
        label: `A`
      },
      'b-turbo': {
        default: `a`,
        label: `B Turbo`
      },
      'a-turbo': {
        default: `s`,
        label: `A Turbo`
      },
      'start': {
        default: `Enter`,
        label: `Start`
      },
      'select': {
        default: `Shift`,
        label: `Select`
      },
      'up': {
        default: `ArrowUp`,
        label: `Up`
      },
      'down': {
        default: `ArrowDown`,
        label: `Down`
      },
      'left': {
        default: `ArrowLeft`,
        label: `Left`
      },
      'right': {
        default: `ArrowRight`,
        label: `Right`
      },
      'ff': {
        default: `\``,
        label: `Fast-Forward`
      }
    };

    for(const [id, data] of Object.entries(this.bindings)) {
      if(!(`settings-kb-${id}` in this.state)) {
        this.state[`settings-kb-${id}`] = data.default;
      }
    }

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

          props.updateSetting(JSON.stringify(bindings));
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
            {Object.entries(this.bindings).map(([id, data])=> (
              <ListItem key={id} className={classes.nested} dense>
                <TextField
                  id={`settings-kb-${id}`}
                  className={classes.input}
                  label={data.label}
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
