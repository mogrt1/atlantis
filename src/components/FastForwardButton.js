import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

import { gameboy } from '../cores/GameBoy-Online/js/index';

export default class FastForwardButton extends React.Component {
  constructor(props) {
    super(props);

    const FAST = 3,
          NORMAL = 1;

    const speed = NORMAL;

    this.toggleEvents = {
      down: ()=> {
        if(gameboy && gameboy.setSpeed) {
          gameboy.setSpeed(
            speed === NORMAL
              ? FAST
              : NORMAL
          );
        }
      }
    };

    this.noToggleEvents = {
      down: ()=> {
        if(gameboy && gameboy.setSpeed) {
          gameboy.setSpeed(FAST);
        }
      },
      up: ()=> {
        if(gameboy && gameboy.setSpeed) {
          gameboy.setSpeed(NORMAL);
        }
      }
    };

    this.events = props.toggle ? this.toggleEvents : this.noToggleEvents;

    this.keyEvents = { [props.kb]: this.events };
  }

  render() {
    return (
      <Button
        className={this.props.className}
        pointerCommands={this.events}
        keyCommands={this.keyEvents}
      >
        {this.props.children}
      </Button>
    );
  }
}

FastForwardButton.propTypes = {
  toggle: PropTypes.bool.isRequired,
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};
