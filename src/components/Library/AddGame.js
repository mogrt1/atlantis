import React from "react";
import PropTypes from "prop-types";

import { styleAddGame } from "./LibraryStyles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { Consumer } from "../Context/Context";

class AddGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpload = action => e => {
      action(e);
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ actions }) => (
          <ListItem button>
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>
            <ListItemText>
              <span>{`Add a Game`}</span>

              <label
                className={classes.addGameLabel}
                htmlFor="library-add-game"
              />
              <input
                id="library-add-game"
                style={{ display: `none` }}
                type="file"
                multiple
                onChange={this.handleUpload(actions.uploadGame)}
              />
            </ListItemText>
          </ListItem>
        )}
      </Consumer>
    );
  }
}

AddGame.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default styleAddGame(AddGame);
