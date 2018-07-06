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

  render() {
    const { classes } = this.props;

    const { currentHomebrew } = this.state;

    return (
      <Consumer>
        {(context)=> (
          <List subheader={
            <ListSubheader className={classes.heading}>
              {`Free Homebrew Games`}
            </ListSubheader>
          }>
            <div>
              <GameList>
                <Game
                  thumb={spaceInvasionThumb}
                  title="Space Invasion"
                  setCurrentROM={this.load(spaceInvasionUri)}
                />
                <Game
                  thumb={flappyBoyThumb}
                  title="FlappyBoy"
                  setCurrentROM={this.load(flappyBoyUri)}
                />
                <Game
                  thumb={infinityThumb}
                  title="Infinity Demo"
                  setCurrentROM={this.load(infinityUri)}
                />
                <Game
                  thumb={postbotThumb}
                  title="Post Bot"
                  setCurrentROM={this.load(postbotUri)}
                />
              </GameList>
              {currentHomebrew && <Loader
                uri={currentHomebrew}
                setCurrentROM={context.actions.setCurrentROM}
              />}
            </div>
          </List>
        )}
      </Consumer>
    );
  }
}

Homebrew.propTypes = { classes: PropTypes.object.isRequired };

export default styleHomebrew(Homebrew);
