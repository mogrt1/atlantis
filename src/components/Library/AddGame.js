import React from "react";
import PropTypes from "prop-types";

import { styleAddGame } from "./LibraryStyles";

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
  const { classes } = props;

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

AddGame.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default React.memo(styleAddGame(AddGame), () => true);
