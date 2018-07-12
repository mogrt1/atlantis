import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

import { gameboy, GameBoyEmulatorPlaying as gameBoyEmulatorPlaying } from '../cores/GameBoy-Online/index';

export default class FastForwardButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    const NORMAL = 1;

    let fastforward = false;

    let pressed = false;

    this.toggleEvents = {
      down: ()=> {
        if(pressed) {
          return false;
        }

        pressed = true;

        if(gameBoyEmulatorPlaying()) {
          fastforward = !fastforward;

          gameboy.setSpeed(
            fastforward
              ? this.props.rate
              : NORMAL
          );
        }
      },
      up: ()=> {
        pressed = false;
      }
    };

    this.noToggleEvents = {
      down: ()=> {
        if(gameBoyEmulatorPlaying()) {
          gameboy.setSpeed(this.props.rate);
        }
      },
      up: ()=> {
        if(gameBoyEmulatorPlaying()) {
          gameboy.setSpeed(NORMAL);
        }
      }
    };
  }

  render() {
    return (
      <Button
        className={this.props.className}
        pointerCommands={this.props.toggle ? this.toggleEvents : this.noToggleEvents}
        keyCommands={{ [this.props.kb]: this.props.toggle ? this.toggleEvents : this.noToggleEvents }}
      >
        {this.props.children}
      </Button>
    );
  }
}

FastForwardButton.propTypes = {
  toggle: PropTypes.bool.isRequired,
  rate: PropTypes.number.isRequired,
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};
