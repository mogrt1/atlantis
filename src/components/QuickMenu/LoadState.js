import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import KeyCommands from '../KeyCommands';

import { openState } from '../../cores/GameBoy-Online/js/index';

import { Consumer } from '../Context';

class LoadState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.load = (canvas)=> ()=> {
      openState(`main`, canvas);
      props.close();
    };
  }

  render() {
    return (
      <Consumer>
        {({ state })=> (
          <React.Fragment>
            <MenuItem onClick={this.load(state.canvas.current)}>
              <ListItemIcon>
                <OpenInBrowserIcon />
              </ListItemIcon>
              <ListItemText>
                {`Load State`}
              </ListItemText>
            </MenuItem>

            <KeyCommands>
              {{ [this.props.kb]: { up: this.load } }}
            </KeyCommands>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

LoadState.propTypes = {
  close: PropTypes.func.isRequired,
  kb: PropTypes.string.isRequired
};

export default LoadState;
