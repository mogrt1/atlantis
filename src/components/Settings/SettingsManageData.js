import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsManageData } from './SettingsStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';

class SettingsKeyBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggleManager = ()=> {
      this.setState({ open: !this.state.open });
    };
  }

  render() {
    const { classes } = this.props;

    const Expand = this.state.open ? ExpandLess : ExpandMore;

    return (
      <React.Fragment>
        <ListItem button onClick={this.toggleManager}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Data Management" className={classes.itemText} />
          <Expand className={classes.expand} />
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.library.map(({ title, md5, rom })=> (
              <ListItem key={md5} className={classes.nested} button dense>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  classes={{
                    root: classes.itemRoot,
                    primary: classes.itemPrimary
                  }}
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
  library: PropTypes.array
  // updateSetting: PropTypes.func.isRequired
};

export default styleSettingsManageData(SettingsKeyBindings);
