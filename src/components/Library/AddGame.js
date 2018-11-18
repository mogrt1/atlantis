import React from "react";

import { useAddGameStyles } from "./LibraryStyles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { appContext } from "../Context/Context";

const handleUpload = action => e => {
  action(e);
};

const AddGame = props => {
  const { actions } = React.useContext(appContext);
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
          onChange={handleUpload(actions.uploadGame)}
        />
      </ListItemText>
    </ListItem>
  );
};

export default React.memo(AddGame, () => true);
