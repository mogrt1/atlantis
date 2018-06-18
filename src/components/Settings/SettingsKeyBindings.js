import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsKeyBindings } from './SettingsStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardIcon from '@material-ui/icons/Keyboard';

class SettingsKeyBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

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
      this.state[`settings-kb-${id}`] = data.default;
    }

    this.toggleBindings = ()=> {
      this.setState({ open: !this.state.open });
    };

    this.assignKey = (e)=> {
      e.preventDefault();

      this.setState({ [e.target.id]: e.key });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <ListItem button onClick={this.toggleBindings}>
          <ListItemIcon>
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText primary="Keyboard Bindings" className={classes.sectionHeading} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Object.entries(this.bindings).map(([id, data])=> (
              <ListItem key={id} className={classes.nested} dense divider>
                <TextField
                  id={`settings-kb-${id}`}
                  label={data.label}
                  value={this.state[`settings-kb-${id}`]}
                  onKeyDown={this.assignKey}
                  margin="normal"
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

SettingsKeyBindings.propTypes = { classes: PropTypes.object.isRequired };

export default styleSettingsKeyBindings(SettingsKeyBindings);
