import React from 'react';
import PropTypes from 'prop-types';

import { get } from 'idb-keyval';

import { styleLibrary } from './LibraryStyles';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import LibraryIcon from '@material-ui/icons/VideoLibrary';

import AddGame from './AddGame';
import GameList from './GameList';

import { Consumer } from '../Context';

class Library extends React.Component {
  componentDidMount() {
    get(`games`).then((games)=> {
      if(!games) {
        return;
      }

      this.props.addToLibrary(
        JSON.parse(games)
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <React.Fragment>
            <IconButton
              color="inherit"
              aria-label="open settings"
              onClick={actions.toggleDrawer(`library`)}
              className={classes.open}
            >
              <LibraryIcon />
            </IconButton>

            <Drawer open={state.libraryOpen} onClose={actions.toggleDrawer(`library`)} anchor="right">
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
        )}
      </Consumer>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
  addToLibrary: PropTypes.func.isRequired
};

export default styleLibrary(Library);
