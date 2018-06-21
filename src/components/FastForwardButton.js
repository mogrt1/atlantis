import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

import { gameboy } from '../cores/GameBoy-Online/js/index';

export default class FastForwardButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: props.rate,
      toggle: props.toggle
    };

    const NORMAL = 1;

    let fastforward = false;

    this.toggleEvents = {
      down: ()=> {
        if(gameboy && gameboy.setSpeed) {
          fastforward = !fastforward;

          gameboy.setSpeed(
            fastforward
              ? this.state.rate
              : NORMAL
          );
        }
      }
    };

    this.noToggleEvents = {
      down: ()=> {
        if(gameboy && gameboy.setSpeed) {
          gameboy.setSpeed(this.state.rate);
        }
      },
      up: ()=> {
        if(gameboy && gameboy.setSpeed) {
          gameboy.setSpeed(NORMAL);
        }
      }
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      rate: props.rate,
      toggle: props.toggle
    };
  }

  render() {
    return (
      <Button
        className={this.props.className}
        pointerCommands={this.state.toggle ? this.toggleEvents : this.noToggleEvents}
        keyCommands={{ [this.props.kb]: this.state.toggle ? this.toggleEvents : this.noToggleEvents }}
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
