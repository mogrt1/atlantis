import React from 'react';
import PropTypes from 'prop-types';

import { styleGame } from './LibraryStyles';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ButtonBase from '@material-ui/core/ButtonBase';

// import { gameboy, settings } from '../../cores/GameBoy-Online/js/index';

// const SOUND = 0;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageError: false };

    this.handleImageError = ()=> {
      this.setState({ imageError: true });
    };

    this.setCurrentROM = ()=> {
      // settings[SOUND] = true;
      props.setCurrentROM(props.rom);
      // gameboy.initSound();
    };

    this.formattedTitle = ()=> {
      const { title } = this.props;

      const START = 0,
            TITLE_LENGTH = 50,
            HALF = 2,
            overflow = title.length - TITLE_LENGTH,
            OVERFLOW_THRESHOLD = 0,
            sliceLength = Math.trunc(TITLE_LENGTH / HALF);

      if(overflow > OVERFLOW_THRESHOLD) {
        return `${
          title.substr(START, sliceLength)
        }…${
          title.substr(title.length - sliceLength, title.length)
        }`;
      }

      return title;
    };
  }

  render() {
    const { classes, thumb, title } = this.props;

    return (
      <GridListTile className={classes.game}>
        <ButtonBase onClick={this.setCurrentROM}>
          {
            !thumb || thumb === `reattempt` || this.state.imageError
              ? <div className={classes.gameImageError} aria-label={title}></div>
              : <img
                src={thumb}
                alt={title}
                className={classes.gameImage}
                onError={this.handleImageError}
              />
          }
        </ButtonBase>
        <GridListTileBar
          title={this.formattedTitle()}
          classes={{
            root: classes.gameTitleOverlay,
            titleWrap: classes.gameTitleWrap,
            title: classes.gameTitleText
          }}
        />
      </GridListTile>

    );
  }
}

Game.propTypes = {
  setCurrentROM: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  rom: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default styleGame(Game);
