import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../cores/GameBoy-Online/js/index';

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

    const TURBO_INTERVAL = 33;
    let turboPressed = false;
    let turboTimeout = null;

    const turbo = ()=> {
      turboPressed = !turboPressed;
      gameBoyJoyPadEvent(buttonCodes[props.type], turboPressed);

      turboTimeout = setTimeout(turbo, TURBO_INTERVAL);
    };

    this.turboEvents = {
      down: ()=> {
        turboTimeout = setTimeout(turbo, TURBO_INTERVAL);
      },
      up: ()=> {
        clearTimeout(turboTimeout);
        gameBoyJoyPadEvent(buttonCodes[props.type]);
      }
    };

    this.keyEvents = {
      [props.kb]: this.events,
      [props.turboKb]: this.turboEvents
    };
  }

  render() {
    return (
      <Button
        className={this.props.className}
        pointerCommands={this.props.turbo ? this.turboEvents : this.events}
        keyCommands={this.keyEvents}
      >
        {this.props.children}{this.props.turbo && <sup>{`τ`}</sup>}
      </Button>
    );
  }
}

GamepadButton.propTypes = {
  type: PropTypes.string.isRequired,
  kb: PropTypes.string.isRequired,
  turbo: PropTypes.bool,
  turboKb: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
