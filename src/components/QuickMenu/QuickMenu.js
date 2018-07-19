import React from 'react';
import PropTypes from 'prop-types';

import { styleQuickMenu } from './QuickMenuStyles';

import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  Button as MaterialButton
} from '@material-ui/core';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SaveIcon from './images/SaveStateIcon';

import Button from '../Button/Button';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

import { gameboy } from '../../cores/GameBoy-Online/index';

// Internal clock parameters.

const DAYS = 512,
      HOURS = 24,
      MINUTES = 60,
      SECONDS = 60,
      ZERO = 0;

class QuickMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchor: null,
      openClock: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
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
      this.setState({
        openClock: true,
        days: gameboy.RTCDays | ZERO || ZERO,
        hours: gameboy.RTCHours | ZERO || ZERO,
        minutes: gameboy.RTCMinutes | ZERO || ZERO,
        seconds: gameboy.RTCSeconds | ZERO || ZERO
      });
    };

    this.changeClock = (unit)=> (e)=> {
      this.setState(
        { [unit]: e.target.value },
        ()=> {
          gameboy.clockUpdate(this.state);
        }
      );
    };

    this.handleExitClock = ()=> {
      this.setState({ openClock: false });
    };
  }

  render() {
    const { anchor } = this.state;
    const { classes } = this.props;

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
                onClose={this.handleClose}
                open={Boolean(anchor)}
                transformOrigin={{
                  vertical: `top`,
                  horizontal: `center`
                }}
              >
                <MenuItem onClick={this.menuAction(actions.saveState)}>
                  <ListItemIcon>
                    <SaveIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`Save State`}
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={this.menuAction(actions.loadState)}>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`Load State`}
                  </ListItemText>
                </MenuItem>

                {gameboy && gameboy.cTIMER
                  && <MenuItem onClick={this.menuAction(this.openClock)}>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {`Change Internal Clock`}
                    </ListItemText>
                  </MenuItem>}

                <MenuItem onClick={this.menuAction(actions.abss)}>
                  <ListItemIcon>
                    <VideogameAssetIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`A+B+Start+Select`}
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={this.menuAction(actions.reset)}>
                  <ListItemIcon>
                    <AutorenewIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {`Reset`}
                  </ListItemText>
                </MenuItem>
              </Menu>

              <Snackbar
                anchorOrigin={{
                  vertical: `top`,
                  horizontal: `center`
                }}
                autoHideDuration={750}
                ContentProps={{
                  'className': classes.snackbar,
                  'aria-describedby': `message`
                }}
                message={<span id="message">
                  {state.message}
                </span>}
                onClose={actions.hideMessage}
                open={Boolean(state.message)}
              />

              <Drawer
                anchor="bottom" classes={{ paper: classes.clock }}
                open={this.state.openClock}>
                <FormControl className={classes.time}>
                  <InputLabel htmlFor="quick-menu-clock-days">
                    {`Days`}
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: `quick-menu-clock-days`,
                      id: `quick-menu-clock-days`
                    }}
                    onChange={this.changeClock(`days`)}
                    value={this.state.days}
                  >
                    {Array(DAYS).fill(ZERO).map((zero, val)=>
                      (<MenuItem key={String(zero + val)} value={val}>
                        {val}
                      </MenuItem>)
                    )}
                  </Select>
                </FormControl>
                <FormControl className={classes.time}>
                  <InputLabel htmlFor="quick-menu-clock-hours">
                    {`Hours`}
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: `quick-menu-clock-hours`,
                      id: `quick-menu-clock-hours`
                    }}
                    onChange={this.changeClock(`hours`)}
                    value={this.state.hours}
                  >
                    {Array(HOURS).fill(ZERO).map((zero, val)=>
                      (<MenuItem key={String(zero + val)} value={val}>
                        {val}
                      </MenuItem>)
                    )}
                  </Select>
                </FormControl>
                <FormControl className={classes.time}>
                  <InputLabel htmlFor="quick-menu-clock-minutes">
                    {`Minutes`}
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: `quick-menu-clock-minutes`,
                      id: `quick-menu-clock-minutes`
                    }}
                    onChange={this.changeClock(`minutes`)}
                    value={this.state.minutes}
                  >
                    {Array(MINUTES).fill(ZERO).map((zero, val)=>
                      (<MenuItem key={String(zero + val)} value={val}>
                        {val}
                      </MenuItem>)
                    )}
                  </Select>
                </FormControl>
                <FormControl className={classes.time}>
                  <InputLabel htmlFor="quick-menu-clock-seconds">
                    {`Seconds`}
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: `quick-menu-clock-seconds`,
                      id: `quick-menu-clock-seconds`
                    }}
                    onChange={this.changeClock(`seconds`)}
                    value={this.state.seconds}
                  >
                    {Array(SECONDS).fill(ZERO).map((zero, val)=>
                      (<MenuItem key={String(zero + val)} value={val}>
                        {val}
                      </MenuItem>)
                    )}
                  </Select>
                </FormControl>
                <MaterialButton className={classes.clockDone} onClick={this.handleExitClock}>
                  {`Done`}
                </MaterialButton>
              </Drawer>

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
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  kb: PropTypes.string.isRequired
};

export default styleQuickMenu(QuickMenu);
