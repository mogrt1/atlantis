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

    const HAPTIC_DURATION = 150;

    this.events = props.events || {
      down: (e)=> {
        gameBoyJoyPadEvent(buttonCodes[props.type], `pressed`);
        console.log(props.type, e.target, e.type);

        if(`vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION);
        }
      },
      up: (e)=> {
        gameBoyJoyPadEvent(buttonCodes[props.type]);
        console.log(props.type, e.target, e.type);

        if(`vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION);
        }
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

        if(`vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION, TURBO_INTERVAL, HAPTIC_DURATION);
        }
      },
      up: ()=> {
        clearTimeout(turboTimeout);
        gameBoyJoyPadEvent(buttonCodes[props.type]);

        if(`vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION);
        }
      }
    };
  }

  render() {
    this.keyEvents = {
      [this.props.kb]: this.events,
      [this.props.turboKb]: this.turboEvents
    };

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
  events: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node
};
