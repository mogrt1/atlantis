import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListSubheader
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Store as StoreIcon } from "@material-ui/icons";

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

  const [storeData, setStoreData] = React.useState();

  const fetchStoreData = async (page = 1) => {
    const payload = await fetch(
      `https://gbhh.avivace.com/api/homebrews?page=${page}`
    );
    const data = await payload.json();

    setStoreData(data);
  };

  const pagination = !storeData
    ? {}
    : {
        onChange: fetchStoreData,
        currentPage: Number(storeData.page),
        totalPages: Number(storeData.pages),
        perPage: Number(storeData.limit),
        totalItems: Number(storeData.total)
      };

  React.useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <>
      <ListItem button onClick={appActions.toggleDrawer(`appStore`)}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText>{`See everything`}</ListItemText>
      </ListItem>

      {storeData && (
        <Drawer
          anchor="right"
          open={state.appStoreOpen}
          onClose={appActions.toggleDrawer(`appStore`)}
        >
          <Box clone p="0">
            <List
              className={classes.drawer}
              role="button"
              subheader={
                <ListSubheader className={classes.heading}>
                  <StoreIcon className={classes.headingIcon} />
                  {`Applantis - Powered by Homebrew Hub`}
                </ListSubheader>
              }
              tabIndex={0}
            >
              <div>
                <GameList pagination={pagination}>
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
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default AppStore;
