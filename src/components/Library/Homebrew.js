import React from 'react';
import PropTypes from 'prop-types';

import { styleHomebrew } from './LibraryStyles';

import {
  List,
  ListSubheader
} from '@material-ui/core';

import { Consumer } from '../Context';

import GameList from './GameList';
import Game from './Game';
import Loader from '../Loader';

import spaceInvasionUri from './homebrew/space-invasion/space-invasion.gb.zip';
import spaceInvasionThumb from './homebrew/space-invasion/space-invasion.png';
import flappyBoyUri from './homebrew/flappyboy/flappyboy.gb.zip';
import flappyBoyThumb from './homebrew/flappyboy/flappyboy.png';
import infinityUri from './homebrew/infinity/infinity.gb.zip';
import infinityThumb from './homebrew/infinity/infinity.png';
import postbotUri from './homebrew/postbot/postbot.gb.zip';
import postbotThumb from './homebrew/postbot/postbot.png';

class Homebrew extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentHomebrew: `` };

    this.load = (uri)=> ()=> {
      this.setState({ currentHomebrew: uri });
    };
  }

  shouldComponentUpdate(...next) {
    const [, nextState] = next;
    return nextState.currentHomebrew && nextState.currentHomebrew !== this.state.currentHomebrew;
  }

  render() {
    const { classes } = this.props;

    const { currentHomebrew } = this.state;

    return (
      <Consumer>
        {({ actions })=> (
          <List subheader={
            <ListSubheader className={classes.heading}>
              {`Free Homebrew Games`}
            </ListSubheader>
          }>
            <div>
              <GameList>
                <Game
                  setCurrentROM={this.load(spaceInvasionUri)}
                  thumb={spaceInvasionThumb}
                  title="Space Invasion"
                />
                <Game
                  setCurrentROM={this.load(flappyBoyUri)}
                  thumb={flappyBoyThumb}
                  title="FlappyBoy"
                />
                <Game
                  setCurrentROM={this.load(infinityUri)}
                  thumb={infinityThumb}
                  title="Infinity Demo"
                />
                <Game
                  setCurrentROM={this.load(postbotUri)}
                  thumb={postbotThumb}
                  title="Post Bot"
                />
              </GameList>
              {currentHomebrew && <Loader
                setCurrentROM={actions.setCurrentROM}
                uri={currentHomebrew}
              />}
            </div>
          </List>
        )}
      </Consumer>
    );
  }
}

Homebrew.propTypes = { classes: PropTypes.objectOf(PropTypes.string).isRequired };

export default styleHomebrew(Homebrew);
