import React from "react";

import { useHomebrewStyles } from "./LibraryStyles";

import { List, ListSubheader } from "@material-ui/core";

import * as libraryActions from "../actions/libraryActions";

import GameList from "./GameList";
import Game from "./Game";
import Loader from "../Loader/Loader";

import spaceInvasionUri from "./homebrew/space-invasion/space-invasion.gb.zip";
import spaceInvasionThumb from "./homebrew/space-invasion/space-invasion.png";
import flappyBoyUri from "./homebrew/flappyboy/flappyboy.gb.zip";
import flappyBoyThumb from "./homebrew/flappyboy/flappyboy.png";
import infinityUri from "./homebrew/infinity/infinity.gb.zip";
import infinityThumb from "./homebrew/infinity/infinity.png";
import postbotUri from "./homebrew/postbot/postbot.gb.zip";
import postbotThumb from "./homebrew/postbot/postbot.png";

const Homebrew = props => {
  const [homebrew, setHomebrew] = React.useState(``);
  const classes = useHomebrewStyles();

  const load = uri => () => {
    setHomebrew(uri);
  };

  return (
    <List
      subheader={
        <ListSubheader className={classes.heading}>
          {`Free Homebrew Games`}
        </ListSubheader>
      }
    >
      <div>
        <GameList>
          <Game
            setCurrentROM={load(spaceInvasionUri)}
            thumb={spaceInvasionThumb}
            title="Space Invasion"
          />
          <Game
            setCurrentROM={load(flappyBoyUri)}
            thumb={flappyBoyThumb}
            title="FlappyBoy"
          />
          <Game
            setCurrentROM={load(infinityUri)}
            thumb={infinityThumb}
            title="Infinity Demo"
          />
          <Game
            setCurrentROM={load(postbotUri)}
            thumb={postbotThumb}
            title="Post Bot"
          />
        </GameList>
        {homebrew && (
          <Loader setCurrentROM={libraryActions.setCurrentROM} uri={homebrew} />
        )}
      </div>
    </List>
  );
};

export default Homebrew;
