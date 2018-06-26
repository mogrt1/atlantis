import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from './images/SaveStateIcon';

import KeyCommands from '../KeyCommands';

import { saveState } from '../../cores/GameBoy-Online/js/index';

class SaveState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.save = ()=> {
      saveState(`main`);
      props.close();
    };
  }

  render() {
    return (
      <React.Fragment>
        <MenuItem onClick={this.save}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText>
            {`Save State`}
          </ListItemText>
        </MenuItem>

        <KeyCommands>
          {{ [this.props.kb]: { up: this.save } }}
        </KeyCommands>
      </React.Fragment>
    );
  }
}

SaveState.propTypes = {
  close: PropTypes.func.isRequired,
  kb: PropTypes.string.isRequired
};

export default SaveState;
