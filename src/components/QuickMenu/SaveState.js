import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from './images/SaveStateIcon';

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
      <MenuItem onClick={this.save}>
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText>
          {`Save State`}
        </ListItemText>
      </MenuItem>
    );
  }
}

SaveState.propTypes = { close: PropTypes.func.isRequired };

export default SaveState;
