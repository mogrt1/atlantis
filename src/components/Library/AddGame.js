import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  addGameLabel as styleAddGameLabel
} from './LibraryStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import { Consumer } from '../Store';

class AddGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rate: 2 };

    this.handleChange = (e)=> {
      this.setState({ [e.target.name]: e.target.value });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {(store)=> (
          <ListItem button>
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>
            <ListItemText>
              <span>
                {`Add a Game`}
              </span>

              <label htmlFor="library-add-game" className={classes.addGameLabel}></label>
              <input
                id="library-add-game"
                type="file"
                multiple
                style={{ display: `none` }}
                onChange={store.actions.addGame}
              />
            </ListItemText>
          </ListItem>
        )}
      </Consumer>
    );
  }
}

AddGame.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles({ addGameLabel: styleAddGameLabel })(AddGame);
