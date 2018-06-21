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

    const buttonCodes = {
      UP: 2,
      DOWN: 3,
      LEFT: 1,
      RIGHT: 0
    };

    const dpadDirection = (direction, pressed)=> {
      switch(direction) {
        case `up`:
          gameBoyJoyPadEvent(buttonCodes.UP, pressed);
          break;
        case `down`:
          gameBoyJoyPadEvent(buttonCodes.DOWN, pressed);
          break;
        case `left`:
          gameBoyJoyPadEvent(buttonCodes.LEFT, pressed);
          break;
        case `right`:
          gameBoyJoyPadEvent(buttonCodes.RIGHT, pressed);
          break;
        default:
          break;
      }
    };

    this.dpadEvents = {
      down: (e)=> e,
      move: (e)=> e,
      up: (e)=> e
    };

    const { keyBindings } = props;

    this.keyEvents = {
      [`${keyBindings[`settings-kb-up`] || `ArrowUp`}`]: {
        down: ()=> dpadDirection(`up`, `pressed`),
        up: ()=> dpadDirection(`up`)
      },
      [`${keyBindings[`settings-kb-down`] || `ArrowDown`}`]: {
        down: ()=> dpadDirection(`down`, `pressed`),
        up: ()=> dpadDirection(`down`)
      },
      [`${keyBindings[`settings-kb-left`] || `ArrowLeft`}`]: {
        down: ()=> dpadDirection(`left`, `pressed`),
        up: ()=> dpadDirection(`left`)
      },
      [`${keyBindings[`settings-kb-right`] || `ArrowRight`}`]: {
        down: ()=> dpadDirection(`right`, `pressed`),
        up: ()=> dpadDirection(`right`)
      }
    };
  }

  render() {
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
  keyBindings: PropTypes.object
};
