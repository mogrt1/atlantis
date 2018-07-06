import React from 'react';
import PropTypes from 'prop-types';

import DpadView from './DpadView';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../../cores/GameBoy-Online/js/index';

export default class Dpad extends React.Component {
  constructor(props) {
    super(props);

    this.dpadRef = React.createRef();

    const dpadDim = {};

    const HALF = 2;

    const BREADTH_VERTICAL = 0.165;
    const BREADTH_HORIZONTAL = 0.33;

    this.updateDpadDim = ()=> {
      if(!this.dpadRef.current) {
        return false;
      }

      const {
        top,
        left,
        width,
        height
      } = this.dpadRef.current.getBoundingClientRect();

      dpadDim.origin = {
        x: left + (width / HALF),
        y: top + (height / HALF)
      };

      dpadDim.offset = {
        x: width * BREADTH_VERTICAL / HALF,
        y: height * BREADTH_HORIZONTAL / HALF
      };
    };

    this.buttonCodes = {
      UP: 2,
      DOWN: 3,
      LEFT: 1,
      RIGHT: 0
    };

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

    let prevPressed = [];

    const HAPTIC_DURATION = 50;

    const detectDirection = (e)=> {
      const x = e.clientX || e.targetTouches[0].clientX,
            y = e.clientY || e.targetTouches[0].clientY;

      const pressed = [];

      const { origin, offset } = dpadDim;

      if(x > origin.x + offset.x) {
        pressed.push(this.buttonCodes.RIGHT);
      } else if(x < origin.x - offset.x) {
        pressed.push(this.buttonCodes.LEFT);
      }

      if(y > origin.y + offset.y) {
        pressed.push(this.buttonCodes.DOWN);
      } else if(y < origin.y - offset.y) {
        pressed.push(this.buttonCodes.UP);
      }

      if(!arraysEqual(pressed, prevPressed)) {
        for(const [, value] of Object.entries(this.buttonCodes)) {
          gameBoyJoyPadEvent(value, pressed.includes(value));
        }

        if(this.props.haptics && `vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION);
        }

        prevPressed = [...pressed];
      }
    };

    let dpadPressed = false;

    this.dpadEvents = {
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

        for(const [, value] of Object.entries(this.buttonCodes)) {
          gameBoyJoyPadEvent(value);
        }

        prevPressed = [];

        if(this.props.haptics && `vibrate` in window.navigator) {
          window.navigator.vibrate(HAPTIC_DURATION);
        }
      }
    };
  }

  componentDidMount() {
    this.updateDpadDim();

    window.addEventListener(`resize`, this.updateDpadDim);
  }

  render() {
    const { kb } = this.props;

    this.keyEvents = {
      [kb[`settings-kb-up`]]: {
        down: ()=> gameBoyJoyPadEvent(this.buttonCodes.UP, `pressed`),
        up: ()=> gameBoyJoyPadEvent(this.buttonCodes.UP)
      },
      [kb[`settings-kb-down`]]: {
        down: ()=> gameBoyJoyPadEvent(this.buttonCodes.DOWN, `pressed`),
        up: ()=> gameBoyJoyPadEvent(this.buttonCodes.DOWN)
      },
      [kb[`settings-kb-left`]]: {
        down: ()=> gameBoyJoyPadEvent(this.buttonCodes.LEFT, `pressed`),
        up: ()=> gameBoyJoyPadEvent(this.buttonCodes.LEFT)
      },
      [kb[`settings-kb-right`]]: {
        down: ()=> gameBoyJoyPadEvent(this.buttonCodes.RIGHT, `pressed`),
        up: ()=> gameBoyJoyPadEvent(this.buttonCodes.RIGHT)
      }
    };

    return (
      <Consumer>
        {({ state })=> (
          <React.Fragment>
            <PointerCommands {...this.dpadEvents}>
              <DpadView className={this.props.className} dpadRef={this.dpadRef} />
            </PointerCommands>

            {
              !state.settingsOpen
              && <KeyCommands>
                {this.keyEvents}
              </KeyCommands>
            }
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

Dpad.propTypes = {
  className: PropTypes.string,
  kb: PropTypes.object,
  haptics: PropTypes.bool
};
