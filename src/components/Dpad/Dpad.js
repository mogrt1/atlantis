import React from 'react';
import PropTypes from 'prop-types';

import DpadView from './DpadView';
import './Dpad.css';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../../cores/GameBoy-Online/js/index';

export default class Dpad extends React.Component {
  constructor(props) {
    super(props);

    this.buttonCodes = {
      UP: 2,
      DOWN: 3,
      LEFT: 1,
      RIGHT: 0
    };

    const TOTAL = 100,
          HALF = 2;

    const wid = window.innerWidth,
          hgt = window.innerHeight,
          vw = wid / TOTAL,
          vh = hgt / TOTAL,
          vmin = vw < vh ? vw : vh;

    const dpadDim = {
      bottom: 12,
      left: 5,
      width: 36,
      height: 36,
      breadth: 0.33
    };

    const origin = {
      x: (dpadDim.left * vw) + (dpadDim.width * vw / HALF),
      y: hgt - (dpadDim.bottom * vh) - (dpadDim.height * vmin / HALF)
    };

    const offset = {
      x: dpadDim.width * vmin * dpadDim.breadth / HALF,
      y: dpadDim.height * vmin * dpadDim.breadth / HALF
    };

    const detectDirection = (e)=> {
      const x = e.clientX || e.targetTouches[0].clientX,
            y = e.clientY || e.targetTouches[0].clientY;

      const pressed = [];

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

      for(const [, value] of Object.entries(this.buttonCodes)) {
        gameBoyJoyPadEvent(value, pressed.includes(value));
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
      }
    };
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
              <DpadView className={this.props.className} />
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
  kb: PropTypes.object
};
