import React from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";

import { appContext } from "../Context/Context";
import * as libraryActions from "../actions/libraryActions";

import { useGameListStyles, libraryWidth, libraryCols } from "./LibraryStyles";
import Game from "./Game";
import GameListPagination, { paginationPropTypes } from "./GameListPagination";

const GameList = ({ children = null, pagination }) => {
  const state = React.useContext(appContext);
  const classes = useGameListStyles();

  return (
    <>
      <GridList
        cellHeight={libraryWidth / libraryCols}
        className={classes.libraryList}
        cols={libraryCols}
        spacing={0}
      >
        {children ||
          state.library.map(data => (
            <Game
              key={data.md5}
              rom={data.md5}
              setCurrentROM={libraryActions.setCurrentROM}
              thumb={data.thumb}
              title={data.title}
            />
          ))}
      </GridList>
      {pagination && <GameListPagination {...pagination} />}
    </>
  );
};

GameList.propTypes = {
  children: PropTypes.node,
  pagination: PropTypes.shape(paginationPropTypes)
};

export default GameList;
