import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../Store';
import { thumbs } from '../../db/gameboy';

import { withStyles } from '@material-ui/core/styles';
import {
  libraryList as styleLibraryList,
  libraryWidth,
  libraryCols
} from './LibraryStyles';

import GridList from '@material-ui/core/GridList';

import Game from './Game';

class GameList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state })=> (
          <GridList cellHeight={libraryWidth / libraryCols} cols={libraryCols} className={classes.libraryList}>
            {state.library.map(({ md5, title })=> (
              <Game
                key={md5}
                thumb={thumbs.replace(`%s`, encodeURIComponent(title))}
                title={title}
              />
            ))}
          </GridList>
        )}
      </Consumer>
    );
  }
}

GameList.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles({ libraryList: styleLibraryList })(GameList);
