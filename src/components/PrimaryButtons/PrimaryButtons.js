import React from "react";
import PropTypes from "prop-types";

import GamepadButton from "../GamepadButton/GamepadButton";
import usePointerHandlers from "../hooks/usePointerHandlers";
import { appContext } from "../Context/Context";
import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from "../../cores/GameBoy-Online/index";

import { usePrimaryButtonStyles } from "./PrimaryButtonsStyles";

const PrimaryButtons = props => {
  const state = React.useContext(appContext);

  const buttonCodes = {
    A: 4,
    B: 5
  };

  const buttonRef = React.useRef();

  let buttonDim = React.useRef({});

  const HALF = 2;

  const updateButtonDim = React.useCallback(() => {
    if (!buttonRef.current) {
      return false;
    }

    const {
      top,
      left,
      width,
      height
    } = buttonRef.current.getBoundingClientRect();

    buttonDim.current = {
      top,
      left,
      width,
      height
    };
  }, []);

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

  const detectButton = (e, turbo) => {
    const x = e.clientX || e.targetTouches[0].clientX,
      y = e.clientY || e.targetTouches[0].clientY;

    const pressed = [];

    const { top, left, width, height } = buttonDim.current;

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

      if (props.haptics && `vibrate` in window.navigator) {
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

  const events = turbo => ({
    down: e => {
      startedPressing = true;

      detectButton(e, turbo);

      if (turbo) {
        turboTimeout = setTimeout(turboEvent, TURBO_INTERVAL);
      }
    },
    move: e => {
      if (!startedPressing) {
        return false;
      }

      detectButton(e, turbo);
    },
    up: () => {
      clearTimeout(turboTimeout);
      turboPressed = true;
      startedPressing = false;

      gameBoyJoyPadEvent(buttonCodes.B);
      gameBoyJoyPadEvent(buttonCodes.A);

      prevPressed = [];

      if (props.haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }
    }
  });

  React.useEffect(() => {
    updateButtonDim();

    const RESIZE_DEBOUNCE = 500;
    window.addEventListener(`resize`, () =>
      setTimeout(updateButtonDim, RESIZE_DEBOUNCE)
    );
  }, [updateButtonDim]);

  const classes = usePrimaryButtonStyles();
  const pointerHandlers = usePointerHandlers(events(state.turbo));

  return (
    <div ref={buttonRef} className={classes.buttons} {...pointerHandlers}>
      <GamepadButton
        className={classes.b}
        haptics={false}
        kb={props.kbB}
        turbo={state.turbo}
        turboKb={props.turboKbB}
        type="B"
      >
        {`B`}
      </GamepadButton>
      <GamepadButton
        className={classes.a}
        haptics={false}
        kb={props.kbA}
        turbo={state.turbo}
        turboKb={props.turboKbA}
        type="A"
      >
        {`A`}
      </GamepadButton>
      <div className={classes.ba} />
    </div>
  );
};

PrimaryButtons.propTypes = {
  kbB: PropTypes.string.isRequired,
  kbA: PropTypes.string.isRequired,
  turboKbB: PropTypes.string.isRequired,
  turboKbA: PropTypes.string.isRequired,
  haptics: PropTypes.bool.isRequired
};

export default PrimaryButtons;
