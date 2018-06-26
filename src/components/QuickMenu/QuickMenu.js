import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from './images/SaveStateIcon';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import Button from '../Button/Button';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

class QuickMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { anchor: null };

    this.events = {
      up: (e)=> {
        this.setState({ anchor: e.currentTarget });
      }
    };

    this.keyEvents = {};

    this.handleClose = ()=> {
      this.setState({ anchor: null });
    };
  }

  render() {
    const { anchor } = this.state;

    return (
      <Consumer>
        {({ state, actions })=> {
          const { keyBindings } = state.settings;

          return (
            <React.Fragment>
              <Button
                onClick={this.handleClick}
                aria-owns={anchor ? `quick-menu` : null}
                aria-haspopup="true"
                className={this.props.className}
                pointerCommands={this.events}
                keyCommands={this.keyEvents}
              >
                <MenuIcon />
              </Button>

              <Menu
                id="quick-menu"
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={actions.saveState}>
                  <ListItemIcon>
                    <SaveIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`Save State`}
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={actions.loadState}>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`Load State`}
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={actions.abss}>
                  <ListItemIcon>
                    <VideogameAssetIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`A+B+Start+Select`}
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={actions.reset}>
                  <ListItemIcon>
                    <AutorenewIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`Reset`}
                  </ListItemText>
                </MenuItem>
              </Menu>

              <KeyCommands>
                {{
                  [keyBindings[`settings-kb-save-state`]]: { up: actions.saveState },
                  [keyBindings[`settings-kb-load-state`]]: { up: actions.loadState },
                  [keyBindings[`settings-kb-abss`]]: { up: actions.abss },
                  [keyBindings[`settings-kb-reset`]]: { up: actions.reset }
                }}
              </KeyCommands>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

QuickMenu.propTypes = {
  className: PropTypes.string,
  kb: PropTypes.string.isRequired
};

export default QuickMenu;
