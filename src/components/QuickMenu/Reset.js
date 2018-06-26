import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import KeyCommands from '../KeyCommands';

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
          <React.Fragment>
            <MenuItem onClick={this.reset(state.canvas.current, state.currentROM)}>
              <ListItemIcon>
                <AutorenewIcon />
              </ListItemIcon>
              <ListItemText>
                {`Reset`}
              </ListItemText>
            </MenuItem>

            <KeyCommands>
              {{ [this.props.kb]: { up: this.reset(state.canvas.current, state.currentROM) } }}
            </KeyCommands>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

Reset.propTypes = {
  close: PropTypes.func.isRequired,
  kb: PropTypes.string.isRequired
};

export default Reset;
