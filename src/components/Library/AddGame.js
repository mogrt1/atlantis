import React from 'react';
// import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

class AddGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rate: 2 };

    this.handleChange = (e)=> {
      this.setState({ [e.target.name]: e.target.value });
    };
  }

  render() {
    return (
      <ListItem button>
        <ListItemIcon>
          <LibraryAddIcon />
        </ListItemIcon>
        <ListItemText>
          <label htmlFor="library-add-game" style={{ cursor: `pointer` }}>
            Add a Game
          </label>
          <input
            id="library-add-game"
            type="file"
            multiple
            style={{ display: `none` }}
          />
        </ListItemText>
      </ListItem>
    );
  }
}

AddGame.propTypes = {};

export default withStyles({})(AddGame);
