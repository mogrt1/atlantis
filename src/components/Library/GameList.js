import React from 'react';
import PropTypes from 'prop-types';

import { appContext } from '../Context/Context';

import { styleGameList, libraryWidth, libraryCols } from './LibraryStyles';

import GridList from '@material-ui/core/GridList';

import Game from './Game';

const GameList = (props)=> {
  const { state, actions } = React.useContext(appContext);
  const { classes } = props;

  return (
    <GridList
      cellHeight={libraryWidth / libraryCols}
      className={classes.libraryList}
      cols={libraryCols}
      spacing={0}
    >
      {props.children || state.library.map((data)=> (
        <Game
          key={data.md5}
          rom={data.rom}
          setCurrentROM={actions.setCurrentROM}
          thumb={data.thumb}
          title={data.title}
        />
      ))}
    </GridList>
  );
};

GameList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

GameList.defaultProps = { children: null };

export default React.memo(styleGameList(GameList), ()=> true);
