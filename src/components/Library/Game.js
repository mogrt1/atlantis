import React from 'react';
import PropTypes from 'prop-types';

import { styleGame } from './LibraryStyles';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ButtonBase from '@material-ui/core/ButtonBase';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageError: false };

    this.handleImageError = ()=> {
      this.setState({ imageError: true });
    };
  }

  render() {
    const { classes, thumb, title } = this.props;

    return (
      <GridListTile className={classes.game}>
        <ButtonBase>
          {
            this.state.imageError
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
          title={title}
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
  thumb: PropTypes.string,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default styleGame(Game);
