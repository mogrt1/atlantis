import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  nested as styleNested,
  sectionHeading as styleSectionHeading
} from './SettingsStyles';

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

    this.state = {
      open: false,
      'settings-kb-b': `z`,
      'settings-kb-a': `x`,
      'settings-kb-b-turbo': `a`,
      'settings-kb-a-turbo': `s`,
      'settings-kb-start': `Enter`,
      'settings-kb-select': `Shift`,
      'settings-kb-up': `ArrowUp`,
      'settings-kb-down': `ArrowDown`,
      'settings-kb-left': `ArrowLeft`,
      'settings-kb-right': `ArrowRight`,
      'settings-kb-ff': `\``
    };

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
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-b"
                label="B"
                value={this.state[`settings-kb-b`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-a"
                label="A"
                value={this.state[`settings-kb-a`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-b-turbo"
                label="B Turbo"
                value={this.state[`settings-kb-b-turbo`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-a-turbo"
                label="A Turbo"
                value={this.state[`settings-kb-a-turbo`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-start"
                label="Start"
                value={this.state[`settings-kb-start`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-select"
                label="Select"
                value={this.state[`settings-kb-select`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-up"
                label="Up"
                value={this.state[`settings-kb-up`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-down"
                label="Down"
                value={this.state[`settings-kb-down`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-left"
                label="Left"
                value={this.state[`settings-kb-left`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-right"
                label="Right"
                value={this.state[`settings-kb-right`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
            <ListItem className={classes.nested} dense divider>
              <TextField
                id="settings-kb-ff"
                label="Fast-Forward"
                value={this.state[`settings-kb-ff`]}
                onKeyDown={this.assignKey}
                margin="normal"
              />
            </ListItem>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

SettingsKeyBindings.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles({
  nested: styleNested,
  sectionHeading: styleSectionHeading
})(SettingsKeyBindings);
