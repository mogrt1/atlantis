import React from 'react';
import PropTypes from 'prop-types';

import { get } from 'idb-keyval';

import { styleLibrary } from './LibraryStyles';

import {
  IconButton,
  Drawer,
  List,
  ListSubheader
} from '@material-ui/core';
import { VideoLibrary as LibraryIcon } from '@material-ui/icons';

import AddGame from './AddGame';
import GameList from './GameList';
import Homebrew from './Homebrew';

import { Consumer } from '../Context/Context';

class Library extends React.Component {
  componentDidMount() {
    get(`games`).then((games)=> {
      if(!games) {
        return;
      }

      this.props.addToLibrary(games);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <React.Fragment>
            <IconButton
              aria-label="open settings"
              className={classes.open}
              color="inherit"
              onClick={actions.toggleDrawer(`library`)}
            >
              <LibraryIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={state.libraryOpen}
              onClose={actions.toggleDrawer(`library`)}
            >
              <List
                className={classes.drawer}
                role="button"
                subheader={
                  <ListSubheader className={classes.heading}>
                    {`Library`}
                  </ListSubheader>
                }
                tabIndex={0}
              >
                <AddGame />
                <GameList />
              </List>

              <Homebrew />
            </Drawer>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  addToLibrary: PropTypes.func.isRequired
};

export default styleLibrary(Library);
