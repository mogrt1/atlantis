import React from 'react';
import PropTypes from 'prop-types';

import { dpadDim } from './DpadStyles';

import DpadView from './DpadView';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../../cores/GameBoy-Online/js/index';

export default class Dpad extends React.Component {
  constructor(props) {
    super(props);

    const TOTAL = 100,
          HALF = 2;

    const screenDim = {};

    let orientation = ``;

    const updateScreenDim = ()=> {
      screenDim.width = window.innerWidth;
      screenDim.height = window.innerHeight;
      screenDim.vw = screenDim.width / TOTAL;
      screenDim.vh = screenDim.height / TOTAL;

      screenDim.vmin =
        screenDim.vw < screenDim.vh
          ? screenDim.vw
          : screenDim.vh;

      screenDim.vmax =
        screenDim.vw > screenDim.vh
          ? screenDim.vw
          : screenDim.vh;

      orientation =
        screenDim.width < screenDim.height
          ? `portrait`
          : `landscape`;
    };

    updateScreenDim();

    window.addEventListener(`resize`, updateScreenDim);

    const getDim = (dim)=>
      dpadDim.portrait[dim].value * screenDim[dpadDim.portrait[dim].unit];

    const origin = {
      portrait: {
        x: getDim(`left`) + (getDim(`width`) / HALF),
        y: (screenDim.vmax * TOTAL) - getDim(`bottom`) - (getDim(`height`) / HALF)
      },
      landscape: {
        x: getDim(`left`) + (getDim(`width`) / HALF),
        y: dpadDim.landscape.bottom.reduce(
          (prev, curr)=> prev - (curr.value * screenDim[curr.unit]),
          screenDim.vmin * TOTAL
        )
      }
    };

    const offset = {
      x: getDim(`width`) * (dpadDim.portrait.breadth.value / TOTAL / HALF),
      y: getDim(`height`) * (dpadDim.portrait.breadth.value / TOTAL / HALF)
    };

    this.buttonCodes = {
      UP: 2,
      DOWN: 3,
      LEFT: 1,
      RIGHT: 0
    };

    const detectDirection = (e)=> {
      const x = e.clientX || e.targetTouches[0].clientX,
            y = e.clientY || e.targetTouches[0].clientY;

      const pressed = [];

      if(x > origin[orientation].x + offset.x) {
        pressed.push(this.buttonCodes.RIGHT);
      } else if(x < origin[orientation].x - offset.x) {
        pressed.push(this.buttonCodes.LEFT);
      }

      if(y > origin[orientation].y + offset.y) {
        pressed.push(this.buttonCodes.DOWN);
      } else if(y < origin[orientation].y - offset.y) {
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
