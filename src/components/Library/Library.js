import React from "react";
import { get } from "idb-keyval";
import { IconButton, Drawer, List, ListSubheader } from "@material-ui/core";
import { VideoLibrary as LibraryIcon } from "@material-ui/icons";

import AppStore from "../AppStore/AppStore";
import { appContext } from "../Context/Context";
import * as libraryActions from "../actions/libraryActions";
import * as appActions from "../actions/appActions";

import AddGame from "./AddGame";
import GameList from "./GameList";
import Homebrew from "./Homebrew";
import { useLibraryStyles } from "./LibraryStyles";

const Library = props => {
  const state = React.useContext(appContext);
  const classes = useLibraryStyles();

  React.useEffect(() => {
    get(`games`).then(games => {
      if (!games) {
        return;
      }

      libraryActions.addToLibrary(games);
    });
  }, []);

  return (
    <>
      <IconButton
        aria-label="open settings"
        className={classes.open}
        onClick={appActions.toggleDrawer(`library`)}
      >
        <LibraryIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.libraryOpen}
        onClose={appActions.toggleDrawer(`library`)}
      >
        <List
          className={classes.drawer}
          role="button"
          subheader={
            <ListSubheader className={classes.heading}>
              {`Library`}
            </ListSubheader>
          }
          tabIndex={0}
        >
          <AddGame />
          <GameList />
        </List>

        <Homebrew />
        <AppStore />
      </Drawer>
    </>
  );
};

export default Library;
