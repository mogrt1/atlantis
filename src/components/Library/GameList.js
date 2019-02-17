import React from "react";
import PropTypes from "prop-types";

import { appContext } from "../Context/Context";
import * as libraryActions from "../actions/libraryActions";

import { useGameListStyles, libraryWidth, libraryCols } from "./LibraryStyles";

import GridList from "@material-ui/core/GridList";

import Game from "./Game";

const GameList = props => {
  const state = React.useContext(appContext);
  const classes = useGameListStyles();

  return (
    <GridList
      cellHeight={libraryWidth / libraryCols}
      className={classes.libraryList}
      cols={libraryCols}
      spacing={0}
    >
      {props.children ||
        state.library.map(data => (
          <Game
            key={data.md5}
            rom={data.rom}
            setCurrentROM={libraryActions.setCurrentROM}
            thumb={data.thumb}
            title={data.title}
          />
        ))}
    </GridList>
  );
};

GameList.propTypes = {
  children: PropTypes.node
};

GameList.defaultProps = { children: null };

export default React.memo(GameList, () => true);
