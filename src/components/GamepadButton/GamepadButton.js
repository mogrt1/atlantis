import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from "../../cores/GameBoy-Online/index";

const buttonCodes = {
  START: 7,
  SELECT: 6,
  A: 4,
  B: 5
};

const HAPTIC_DURATION = 50;
const TURBO_INTERVAL = 33;

const useButtonEvents = ({ haptics, type, events }) => {
  const normalEvents = {
    down: () => {
      gameBoyJoyPadEvent(buttonCodes[type], `pressed`);

      if (haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }
    },
    up: () => {
      gameBoyJoyPadEvent(buttonCodes[type]);

      if (haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }
    },
    ...events
  };

  const turboPressed = React.useRef(false);
  const turboTimeout = React.useRef(null);

  const turbo = () => {
    turboPressed.current = !turboPressed.current;
    gameBoyJoyPadEvent(buttonCodes[type], turboPressed.current);

    turboTimeout.current = setTimeout(turbo, TURBO_INTERVAL);
  };

  const turboEvents = {
    down: () => {
      turboTimeout.current = setTimeout(turbo, TURBO_INTERVAL);

      if (haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(
          HAPTIC_DURATION,
          TURBO_INTERVAL,
          HAPTIC_DURATION
        );
      }
    },
    up: () => {
      clearTimeout(turboTimeout.current);
      gameBoyJoyPadEvent(buttonCodes[type]);

      if (haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }
    }
  };

  return [normalEvents, turboEvents];
};

const GamepadButton = ({
  turbo = null,
  turboKb = ``,
  events = {},
  className = ``,
  children = null,
  kb,
  type,
  haptics
}) => {
  const [normalEvents, turboEvents] = useButtonEvents({
    haptics,
    type,
    events
  });

  const keyEvents = {
    [kb]: normalEvents,
    [turboKb]: turboEvents
  };

  return (
    <Button
      className={className}
      keyCommands={keyEvents}
      pointerCommands={turbo ? turboEvents : normalEvents}
    >
      {children}
      {turbo && <sup>{`τ`}</sup>}
    </Button>
  );
};

GamepadButton.propTypes = {
  type: PropTypes.string.isRequired,
  kb: PropTypes.string.isRequired,
  turbo: PropTypes.bool,
  turboKb: PropTypes.string,
  events: PropTypes.objectOf(PropTypes.func),
  className: PropTypes.string,
  children: PropTypes.node,
  haptics: PropTypes.bool.isRequired
};

export default GamepadButton;
