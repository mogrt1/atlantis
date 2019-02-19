import React from "react";

import { useAddGameStyles } from "./LibraryStyles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import * as libraryActions from "../actions/libraryActions";

const handleUpload = action => e => {
  action(e);
};

const AddGame = props => {
  const classes = useAddGameStyles();

  return (
    <ListItem button>
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText>
        <span>{`Add a Game`}</span>

        <label className={classes.addGameLabel} htmlFor="library-add-game" />
        <input
          id="library-add-game"
          style={{ display: `none` }}
          type="file"
          multiple
          onChange={handleUpload(libraryActions.uploadGame)}
        />
      </ListItemText>
    </ListItem>
  );
};

export default React.memo(AddGame, () => true);
