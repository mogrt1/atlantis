import React from "react";
import PropTypes from "prop-types";

import { styleGame } from "./LibraryStyles";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ButtonBase from "@material-ui/core/ButtonBase";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageError: false };

    this.handleImageError = () => {
      this.setState({ imageError: true });
    };

    this.handleROMSelection = () => {
      props.setCurrentROM(props.rom);
    };

    this.formattedTitle = () => {
      const { title } = this.props;

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
  }

  render() {
    const { classes, thumb, title } = this.props;

    return (
      <GridListTile className={classes.game}>
        <ButtonBase onClick={this.handleROMSelection}>
          {!thumb || thumb === `reattempt` || this.state.imageError ? (
            <div aria-label={title} className={classes.gameImageError} />
          ) : (
            <img
              alt={title}
              className={classes.gameImage}
              onError={this.handleImageError}
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
          title={this.formattedTitle()}
        />
      </GridListTile>
    );
  }
}

Game.propTypes = {
  setCurrentROM: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  rom: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

Game.defaultProps = { rom: `` };

export default styleGame(Game);
