import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListSubheader
} from "@material-ui/core";
import { Store as StoreIcon } from "@material-ui/icons";

import storeData from "../../mockData/homebrews.json";
import { appContext } from "../Context/Context";
import * as appActions from "../actions/appActions";
import { useLibraryStyles } from "../Library/LibraryStyles";
import GameList from "../Library/GameList.js";
import Game from "../Library/Game.js";
import Loader from "../Loader/Loader.js";

const AppStore = () => {
  const state = React.useContext(appContext);
  const [selectedGame, setSelectedGame] = React.useState();

  const classes = useLibraryStyles();

  const load = uri => () => setSelectedGame(uri);

  return (
    <>
      <ListItem button onClick={appActions.toggleDrawer(`appStore`)}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText>{`See everything`}</ListItemText>
      </ListItem>

      <Drawer
        anchor="right"
        open={state.appStoreOpen}
        onClose={appActions.toggleDrawer(`appStore`)}
      >
        <List
          className={classes.drawer}
          role="button"
          subheader={
            <ListSubheader className={classes.heading}>
              <StoreIcon className={classes.headingIcon} />
              {`Applantis`}
            </ListSubheader>
          }
          tabIndex={0}
        >
          <div>
            <GameList>
              {storeData.docs.map(
                ({ permalink, rom, screenshots, title, developer }) => (
                  <Game
                    key={permalink}
                    setCurrentROM={load(
                      `https://gbhh.avivace.com/database/entries/${permalink}/${rom}`
                    )}
                    thumb={`https://gbhh.avivace.com/database/entries/${permalink}/${
                      screenshots[0]
                    }`}
                    title={title}
                    developer={developer}
                  />
                )
              )}
            </GameList>

            <Loader uri={selectedGame} />
          </div>
        </List>
      </Drawer>
    </>
  );
};

export default AppStore;
