import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

import { gameboy } from '../cores/GameBoy-Online/js/index';

export default class FastForwardButton extends React.Component {
  constructor(props) {
    super(props);

    this.events = {
      down: ()=> {
        if(gameboy && gameboy.setSpeed) {
          const FAST = 3;
          gameboy.setSpeed(FAST);
        }
      },
      up: ()=> {
        if(gameboy && gameboy.setSpeed) {
          const NORMAL = 1;
          gameboy.setSpeed(NORMAL);
        }
      }
    };

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
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};
