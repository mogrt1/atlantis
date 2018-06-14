import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../../cores/GameBoy-Online/js/index';

export default class GamepadButton extends React.Component {
  constructor(props) {
    super(props);

    const buttonCodes = {
      START: 7,
      SELECT: 6,
      A: 4,
      B: 5
    };

    this.events = {
      down: ()=> {
        gameBoyJoyPadEvent(buttonCodes[props.type], `pressed`);
      },
      up: ()=> {
        gameBoyJoyPadEvent(buttonCodes[props.type]);
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

GamepadButton.propTypes = {
  type: PropTypes.string.isRequired,
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};
