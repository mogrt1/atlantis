import React from "react";
import PropTypes from "prop-types";

import { stylePrimaryButtons } from "./PrimaryButtonsStyles";

import PointerCommands from "../PointerCommands";
import GamepadButton from "../GamepadButton";

import { Consumer } from "../Context/Context";

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from "../../cores/GameBoy-Online/index";

class PrimaryButtons extends React.Component {
  constructor(props) {
    super(props);

    const buttonCodes = {
      A: 4,
      B: 5
    };

    this.buttonRef = React.createRef();

    let buttonDim = {};

    const HALF = 2;

    this.updateButtonDim = () => {
      if (!this.buttonRef.current) {
        return false;
      }

      const {
        top,
        left,
        width,
        height
      } = this.buttonRef.current.getBoundingClientRect();

      buttonDim = {
        top,
        left,
        width,
        height
      };
    };

    const arraysEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) {
        return false;
      }

      for (const [i, el] of arr1.entries()) {
        if (el !== arr2[i]) {
          return false;
        }
      }

      return true;
    };

    let prevPressed = [];

    const HAPTIC_DURATION = 50;
    const TURBO_INTERVAL = 33;

    this.detectButton = (e, turbo) => {
      const x = e.clientX || e.targetTouches[0].clientX,
        y = e.clientY || e.targetTouches[0].clientY;

      const pressed = [];

      const { top, left, width, height } = buttonDim;

      if (x < left || x > left + width || y < top || y > top + height) {
        return false;
      }

      const el = document.elementFromPoint(x, y);

      if (el.className.includes(`ba`)) {
        pressed.push(buttonCodes.B);
        pressed.push(buttonCodes.A);
      } else if (x < left + width / HALF) {
        pressed.push(buttonCodes.B);
      } else {
        pressed.push(buttonCodes.A);
      }

      if (!arraysEqual(pressed, prevPressed)) {
        for (const [, value] of Object.entries(buttonCodes)) {
          gameBoyJoyPadEvent(value, pressed.includes(value));
        }

        if (this.props.haptics && `vibrate` in window.navigator) {
          window.navigator.vibrate(
            turbo
              ? [HAPTIC_DURATION, TURBO_INTERVAL, HAPTIC_DURATION]
              : HAPTIC_DURATION
          );
        }

        prevPressed = [...pressed];
      }
    };

    let turboPressed = true;
    let turboTimeout = null;

    const turboEvent = () => {
      turboPressed = !turboPressed;

      for (const button of prevPressed) {
        gameBoyJoyPadEvent(button, turboPressed);
      }

      turboTimeout = setTimeout(turboEvent, TURBO_INTERVAL);
    };

    let startedPressing = false;

    this.events = turbo => ({
      down: e => {
        startedPressing = true;

        this.detectButton(e, turbo);

        if (turbo) {
          turboTimeout = setTimeout(turboEvent, TURBO_INTERVAL);
        }
      },
      move: e => {
        if (!startedPressing) {
          return false;
        }

        this.detectButton(e, turbo);
      },
      up: () => {
        clearTimeout(turboTimeout);
        turboPressed = true;
        startedPressing = false;

        gameBoyJoyPadEvent(buttonCodes.B);
        gameBoyJoyPadEvent(buttonCodes.A);

        prevPressed = [];

        if (this.props.haptics && `vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION);
        }
      }
    });
  }

  componentDidMount() {
    this.updateButtonDim();

    const RESIZE_DEBOUNCE = 500;
    window.addEventListener(`resize`, () =>
      setTimeout(this.updateButtonDim, RESIZE_DEBOUNCE)
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ state }) => (
          <PointerCommands {...this.events(state.turbo)} apply>
            <div ref={this.buttonRef} className={classes.buttons}>
              <GamepadButton
                className={classes.b}
                haptics={false}
                kb={this.props.kbB}
                turbo={state.turbo}
                turboKb={this.props.turboKbB}
                type="B"
              >
                {`B`}
              </GamepadButton>
              <GamepadButton
                className={classes.a}
                haptics={false}
                kb={this.props.kbA}
                turbo={state.turbo}
                turboKb={this.props.turboKbA}
                type="A"
              >
                {`A`}
              </GamepadButton>
              <div className={classes.ba} />
            </div>
          </PointerCommands>
        )}
      </Consumer>
    );
  }
}

PrimaryButtons.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  kbB: PropTypes.string.isRequired,
  kbA: PropTypes.string.isRequired,
  turboKbB: PropTypes.string.isRequired,
  turboKbA: PropTypes.string.isRequired,
  haptics: PropTypes.bool.isRequired
};

export default stylePrimaryButtons(PrimaryButtons);
