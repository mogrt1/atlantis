import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from '@material-ui/core';
import {
  OpenInBrowser as OpenInBrowserIcon,
  SaveAlt as SaveIcon,
  VideogameAsset as VideogameAssetIcon,
  Autorenew as AutorenewIcon,
  AccessTime as AccessTimeIcon
} from '@material-ui/icons';

import Button from '../Button/Button';
import KeyCommands from '../KeyCommands';
import QuickMenuItem from './QuickMenuItem';
import InternalClock from '../InternalClock/InternalClock';

import { gameboy } from '../../cores/GameBoy-Online/index';

import { Consumer } from '../Context/Context';

export default class QuickMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchor: null,
      openClock: false
    };

    this.events = {
      up: (e)=> {
        this.setState({ anchor: e.currentTarget });
      }
    };

    this.keyEvents = {};

    this.menuAction = (action)=> ()=> {
      action();
      this.handleClose();
    };

    this.handleClose = ()=> {
      this.setState({ anchor: null });
    };

    this.openClock = ()=> {
      this.setState({ openClock: true });
    };

    this.closeClock = ()=> {
      this.setState({ openClock: false });
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
                aria-haspopup="true"
                aria-owns={anchor ? `quick-menu` : null}
                className={this.props.className}
                keyCommands={this.keyEvents}
                pointerCommands={this.events}
              >
                {this.props.children}
              </Button>

              <Menu
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: `top`,
                  horizontal: `center`
                }}
                id="quick-menu"
                open={Boolean(anchor)}
                transformOrigin={{
                  vertical: `top`,
                  horizontal: `center`
                }}
                onClose={this.handleClose}
              >
                <QuickMenuItem
                  icon={<SaveIcon />}
                  label="Save State"
                  onClick={this.menuAction(actions.saveState)}
                />
                <QuickMenuItem
                  icon={<OpenInBrowserIcon />}
                  label="Load State"
                  onClick={this.menuAction(actions.loadState)}
                />
                {gameboy && gameboy.cTIMER
                  && <QuickMenuItem
                    icon={<AccessTimeIcon />}
                    label="Change Internal Clock"
                    onClick={this.menuAction(this.openClock)}
                  />
                }
                <QuickMenuItem
                  icon={<VideogameAssetIcon />}
                  label="A+B+Start+Select"
                  onClick={this.menuAction(actions.abss)}
                />
                <QuickMenuItem
                  icon={<AutorenewIcon />}
                  label="Reset"
                  onClick={this.menuAction(actions.reset)}
                />
              </Menu>

              {gameboy && gameboy.cTIMER
                && <InternalClock
                  handleDone={this.closeClock}
                  open={this.state.openClock}
                />
              }

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
  children: PropTypes.node,
  className: PropTypes.string
};

QuickMenu.defaultProps = {
  children: null,
  className: ``
};
