import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '../Button/Button';
import SaveState from './SaveState';
import LoadState from './LoadState';
import ABStartSelect from './ABStartSelect';
import Reset from './Reset';

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
        {({ state })=> {
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
                <SaveState close={this.handleClose} kb={keyBindings[`settings-kb-save-state`]} />
                <LoadState close={this.handleClose} kb={keyBindings[`settings-kb-load-state`]} />
                <ABStartSelect close={this.handleClose} kb={keyBindings[`settings-kb-abss`]} />
                <Reset close={this.handleClose} kb={keyBindings[`settings-kb-reset`]} />
              </Menu>
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
