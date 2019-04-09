import React from "react";
import PropTypes from "prop-types";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ButtonBase from "@material-ui/core/ButtonBase";
import { get } from "idb-keyval";

import { useGameStyles } from "./LibraryStyles";

const Game = ({ rom, thumb, title, developer, setCurrentROM }) => {
  const [imageError, setImageError] = React.useState(false);
  const classes = useGameStyles();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleROMSelection = async () => {
    let selectedROM = rom;
    if (typeof selectedROM === `string`) {
      selectedROM = await get(selectedROM);
    }

    setCurrentROM(selectedROM);
  };

  const formattedTitle = () => {
    const START = 0,
      TITLE_LENGTH = 50,
      HALF = 2,
      overflow = title.length - TITLE_LENGTH,
      OVERFLOW_THRESHOLD = 0,
      sliceLength = Math.trunc(TITLE_LENGTH / HALF);

    if (overflow > OVERFLOW_THRESHOLD) {
      return `${title.substr(START, sliceLength)}…${title.substr(
        title.length - sliceLength,
        title.length
      )}`;
    }

    return title;
  };

  return (
    <GridListTile className={classes.game}>
      <ButtonBase onClick={handleROMSelection}>
        {!thumb || thumb === `reattempt` || imageError ? (
          <div aria-label={title} className={classes.gameImageError} />
        ) : (
          <img
            alt={title}
            className={classes.gameImage}
            onError={handleImageError}
            src={thumb}
          />
        )}
      </ButtonBase>
      <GridListTileBar
        classes={{
          root: classes.gameTitleRoot,
          titleWrap: classes.gameTitleWrap,
          title: classes.gameTitleText
        }}
        title={formattedTitle()}
        subtitle={developer}
      />
    </GridListTile>
  );
};

Game.propTypes = {
  setCurrentROM: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  developer: PropTypes.string,
  thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  rom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(ArrayBuffer)
  ])
};

export default Game;
