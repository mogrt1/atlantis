import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../Context';

import { styleGameList, libraryWidth, libraryCols } from './LibraryStyles';

import GridList from '@material-ui/core/GridList';

import Game from './Game';

class GameList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state, actions })=> (
          <GridList
            className={classes.libraryList}
            cellHeight={libraryWidth / libraryCols}
            cols={libraryCols}
            spacing={0}
          >
            {this.props.children || state.library.map((data)=> (
              <Game
                key={data.md5}
                thumb={data.thumb}
                title={data.title}
                rom={data.rom}
                setCurrentROM={actions.setCurrentROM}
              />
            ))}
          </GridList>
        )}
      </Consumer>
    );
  }
}

GameList.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default styleGameList(GameList);
