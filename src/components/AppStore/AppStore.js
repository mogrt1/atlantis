import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListSubheader,
  Avatar,
  ListItemAvatar
} from "@material-ui/core";
import { Store as StoreIcon } from "@material-ui/icons";

import storeData from "../../mockData/homebrews.json";
import { appContext } from "../Context/Context";
import * as appActions from "../actions/appActions";
import { useLibraryStyles } from "../Library/LibraryStyles";

const AppStore = () => {
  const state = React.useContext(appContext);

  const classes = useLibraryStyles();

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
              <StoreIcon />
              {`Applantis`}
            </ListSubheader>
          }
          tabIndex={0}
        >
          {storeData.docs.map(game => (
            <ListItem key={game.title}>
              <ListItemAvatar>
                <Avatar
                  alt={game.title}
                  // src={`https://gbhh.avivace.com/database/entries/${
                  //   game.permalink
                  // }/${game.screenshots[0]}`}
                />
              </ListItemAvatar>

              <ListItemText secondary={game.developer}>
                {game.title}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AppStore;
