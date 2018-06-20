import React from 'react';
import PropTypes from 'prop-types';

import { set } from 'idb-keyval';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from './images/SaveStateIcon';

import { saveState, saveValue } from '../../cores/GameBoy-Online/js/index';

class SaveState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.save = ()=> {
      saveState(`main`);
      props.close();
    };

    saveValue.subscribe((key, value)=> {
      set(key, value);
    });
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
