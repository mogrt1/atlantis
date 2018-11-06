import React from 'react';
import PropTypes from 'prop-types';

import DpadView from './DpadView';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { appContext } from '../Context/Context';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../../cores/GameBoy-Online/index';

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

const arraysEqual = (arr1, arr2)=> {
  if(arr1.length !== arr2.length) {
    return false;
  }

  for(const [i, el] of arr1.entries()) {
    if(el !== arr2[i]) {
      return false;
    }
  }

  return true;
};

const RESIZE_DEBOUNCE = 500;

const updateDpadDim = (dpadRef, dpadDim)=> {
  if(!dpadRef.current) {
    return false;
  }

  const {
    top,
    left,
    width,
    height
  } = dpadRef.current.getBoundingClientRect();

  dpadDim.current.origin = {
    x: left + (width / HALF),
    y: top + (height / HALF)
  };

  dpadDim.current.offset = {
    x: width * BREADTH_VERTICAL / HALF,
    y: height * BREADTH_HORIZONTAL / HALF
  };
};

const updateDimensions = (dpadDim, dpadRef)=> {
  updateDpadDim(dpadDim, dpadRef);

  window.addEventListener(`resize`, ()=> setTimeout(()=> {
    updateDpadDim(dpadDim, dpadRef);
  }, RESIZE_DEBOUNCE));
};

const Dpad = (props)=> {
  const dpadRef = React.useRef();

  const dpadDim = React.useRef({});

  let prevPressed = [];

  const detectDirection = (e)=> {
    const x = e.clientX || e.targetTouches[0].clientX,
          y = e.clientY || e.targetTouches[0].clientY;

    const pressed = [];

    const { origin, offset } = dpadDim;

    if(x > origin.x + offset.x) {
      pressed.push(buttonCodes.RIGHT);
    } else if(x < origin.x - offset.x) {
      pressed.push(buttonCodes.LEFT);
    }

    if(y > origin.y + offset.y) {
      pressed.push(buttonCodes.DOWN);
    } else if(y < origin.y - offset.y) {
      pressed.push(buttonCodes.UP);
    }

    if(!arraysEqual(pressed, prevPressed)) {
      for(const [, value] of Object.entries(buttonCodes)) {
        gameBoyJoyPadEvent(value, pressed.includes(value));
      }

      if(props.haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }

      prevPressed = [...pressed];
    }
  };

  let dpadPressed = false;

  const dpadEvents = {
    down: (e)=> {
      dpadPressed = true;
      detectDirection(e);
    },

    move: (e)=> {
      if(dpadPressed) {
        detectDirection(e);
      }
    },

    up: ()=> {
      dpadPressed = false;

      for(const [, value] of Object.entries(buttonCodes)) {
        gameBoyJoyPadEvent(value);
      }

      prevPressed = [];

      if(props.haptics && `vibrate` in window.navigator) {
        window.navigator.vibrate(HAPTIC_DURATION);
      }
    }
  };

  React.useEffect(()=> {
    updateDimensions(dpadDim, dpadRef);
  }, []);

  const { kb } = props;

  const keyEvents = {
    [kb[`settings-kb-up`]]: {
      down: ()=> gameBoyJoyPadEvent(buttonCodes.UP, `pressed`),
      up: ()=> gameBoyJoyPadEvent(buttonCodes.UP)
    },
    [kb[`settings-kb-down`]]: {
      down: ()=> gameBoyJoyPadEvent(buttonCodes.DOWN, `pressed`),
      up: ()=> gameBoyJoyPadEvent(buttonCodes.DOWN)
    },
    [kb[`settings-kb-left`]]: {
      down: ()=> gameBoyJoyPadEvent(buttonCodes.LEFT, `pressed`),
      up: ()=> gameBoyJoyPadEvent(buttonCodes.LEFT)
    },
    [kb[`settings-kb-right`]]: {
      down: ()=> gameBoyJoyPadEvent(buttonCodes.RIGHT, `pressed`),
      up: ()=> gameBoyJoyPadEvent(buttonCodes.RIGHT)
    }
  };

  const { state } = React.useContext(appContext);

  return (
    <>
      <PointerCommands {...dpadEvents}>
        <DpadView className={props.className} dpadRef={dpadRef} />
      </PointerCommands>

      {
        !state.settingsOpen
        && <KeyCommands>
          {keyEvents}
        </KeyCommands>
      }
    </>
  );
};

Dpad.propTypes = {
  className: PropTypes.string,
  kb: PropTypes.objectOf(PropTypes.string).isRequired,
  haptics: PropTypes.bool.isRequired
};

Dpad.defaultProps = { className: `` };

export default Dpad;
