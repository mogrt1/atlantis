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
          <GridList cellHeight={libraryWidth / libraryCols} cols={libraryCols} className={classes.libraryList}>
            {state.library.map((data)=> (
              <Game
                key={data.md5}
                thumb={data.thumb}
                title={data.title}
                rom={data.rom}
                runGame={actions.runGame}
              />
            ))}
          </GridList>
        )}
      </Consumer>
    );
  }
}

GameList.propTypes = { classes: PropTypes.object.isRequired };

export default styleGameList(GameList);
