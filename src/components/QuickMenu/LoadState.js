import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

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
          <MenuItem onClick={this.load(state.canvas.current)}>
            <ListItemIcon>
              <OpenInBrowserIcon />
            </ListItemIcon>
            <ListItemText>
              {`Load State`}
            </ListItemText>
          </MenuItem>
        )}
      </Consumer>
    );
  }
}

LoadState.propTypes = { close: PropTypes.func.isRequired };

export default LoadState;
