import React from 'react';
import PropTypes from 'prop-types';

import { styleLibrary } from './LibraryStyles';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import LibraryIcon from '@material-ui/icons/VideoLibrary';

import AddGame from './AddGame';
import GameList from './GameList';

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggleSettings = ()=> {
      this.setState({ open: !this.state.open });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <IconButton
          color="inherit"
          aria-label="open settings"
          onClick={this.toggleSettings}
          className={classes.open}
        >
          <LibraryIcon />
        </IconButton>

        <Drawer open={this.state.open} onClose={this.toggleSettings} anchor="right">
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.drawer}>
              <List subheader={
                <ListSubheader className={classes.heading}>
                  Library
                </ListSubheader>
              }>
                <div>
                  <AddGame />
                  <GameList />
                </div>
              </List>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

Library.propTypes = { classes: PropTypes.object.isRequired };

export default styleLibrary(Library);
