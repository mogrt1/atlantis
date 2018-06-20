import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { start } from '../../cores/GameBoy-Online/js/index';

import { Consumer } from '../Context';

class Reset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.reset = (canvas, currentROM)=> ()=> {
      start(canvas, currentROM);
      props.close();
    };
  }

  render() {
    return (
      <Consumer>
        {({ state })=> (
          <MenuItem onClick={this.reset(state.canvas.current, state.currentROM)}>
            <ListItemIcon>
              <AutorenewIcon />
            </ListItemIcon>
            <ListItemText>
              {`Reset`}
            </ListItemText>
          </MenuItem>
        )}
      </Consumer>
    );
  }
}

Reset.propTypes = { close: PropTypes.func.isRequired };

export default Reset;
