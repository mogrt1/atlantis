import React from "react";
import PropTypes from "prop-types";

import usePointerHandlers from "../hooks/usePointerHandlers";
import useKeyHandlers from "../hooks/useKeyHandlers";
import { appContext } from "../Context/Context";
import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from "../../cores/GameBoy-Online/index";

import DpadView from "./DpadView";

// Constants.

const HALF = 2;

const BREADTH_VERTICAL = 0.165;
const BREADTH_HORIZONTAL = 0.33;

const buttonCodes = {
  UP: 2,
  DOWN: 3,
  LEFT: 1,
  RIGHT: 0
};

const HAPTIC_DURATION = 50;

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

const RESIZE_DEBOUNCE = 500;

// Hooks.

const useDimensions = () => {
  const ref = React.useRef();
  const [dim, setDim] = React.useState({});

  React.useLayoutEffect(() => {
    const handleNewOrigin = () =>
      setTimeout(() => {
        const {
          top,
          left,
          width,
          height
        } = ref.current.getBoundingClientRect();

        setDim({
          origin: {
            x: left + width / HALF,
            y: top + height / HALF
          },
          offset: {
            x: (width * BREADTH_VERTICAL) / HALF,
            y: (height * BREADTH_HORIZONTAL) / HALF
          }
        });
      }, RESIZE_DEBOUNCE);

    handleNewOrigin();

    window.addEventListener(`resize`, handleNewOrigin);

    return () => {
      window.removeEventListener(`resize`, handleNewOrigin);
    };
  }, []);

  return [ref, dim];
};

const useDpadEvents = (dpadDim, haptics) => {
  let prevPressed = [];
  let isDpadPressed = false;

  const detectDirection = e => {
    const x = e.clientX ?? e.targetTouches[0].clientX;
    const y = e.clientY ?? e.targetTouches[0].clientY;

    const pressed = [];

    const { origin, offset } = dpadDim;

    if (x > origin.x + offset.x) {
      pressed.push(buttonCodes.RIGHT);
    } else if (x < origin.x - offset.x) {
      pressed.push(buttonCodes.LEFT);
    }

    if (y > origin.y + offset.y) {
      pressed.push(buttonCodes.DOWN);
    } else if (y < origin.y - offset.y) {
      pressed.push(buttonCodes.UP);
    }

    if (!arraysEqual(pressed, prevPressed)) {
      for (const [, value] of Object.entries(buttonCodes)) {
        gameBoyJoyPadEvent(value, pressed.includes(value));
      }

      if (haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }

      prevPressed = [...pressed];
    }
  };

  const dpadEvents = {
    down: e => {
      isDpadPressed = true;
      detectDirection(e);
    },

    move: e => {
      if (isDpadPressed) {
        detectDirection(e);
      }
    },

    up: () => {
      isDpadPressed = false;

      for (const [, value] of Object.entries(buttonCodes)) {
        gameBoyJoyPadEvent(value);
      }

      prevPressed = [];

      if (haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }
    }
  };

  return dpadEvents;
};

const useKeyEvents = kb => {
  const keyEvents = {
    [kb[`settings-kb-up`]]: {
      down: () => gameBoyJoyPadEvent(buttonCodes.UP, `pressed`),
      up: () => gameBoyJoyPadEvent(buttonCodes.UP)
    },
    [kb[`settings-kb-down`]]: {
      down: () => gameBoyJoyPadEvent(buttonCodes.DOWN, `pressed`),
      up: () => gameBoyJoyPadEvent(buttonCodes.DOWN)
    },
    [kb[`settings-kb-left`]]: {
      down: () => gameBoyJoyPadEvent(buttonCodes.LEFT, `pressed`),
      up: () => gameBoyJoyPadEvent(buttonCodes.LEFT)
    },
    [kb[`settings-kb-right`]]: {
      down: () => gameBoyJoyPadEvent(buttonCodes.RIGHT, `pressed`),
      up: () => gameBoyJoyPadEvent(buttonCodes.RIGHT)
    }
  };

  return keyEvents;
};

const Dpad = ({ className = ``, kb, haptics }) => {
  const state = React.useContext(appContext);

  const [dpadRef, dpadDim] = useDimensions();
  const dpadEvents = useDpadEvents(dpadDim, haptics);
  const pointerHandlers = usePointerHandlers(dpadEvents);

  const keyEvents = useKeyEvents(kb);

  useKeyHandlers(keyEvents, !state.settingsOpen);

  return (
    <DpadView
      className={className}
      dpadRef={dpadRef}
      pointerHandlers={pointerHandlers}
    />
  );
};

Dpad.propTypes = {
  className: PropTypes.string,
  kb: PropTypes.objectOf(PropTypes.string).isRequired,
  haptics: PropTypes.bool.isRequired
};

export default Dpad;
