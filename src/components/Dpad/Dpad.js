import React from 'react';
import PropTypes from 'prop-types';

import DpadView from './DpadView';
import './Dpad.css';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

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

    this.keyEvents = {
      ArrowUp: {
        down: ()=> dpadDirection(`up`, `pressed`),
        up: ()=> dpadDirection(`up`)
      },
      ArrowDown: {
        down: ()=> dpadDirection(`down`, `pressed`),
        up: ()=> dpadDirection(`down`)
      },
      ArrowLeft: {
        down: ()=> dpadDirection(`left`, `pressed`),
        up: ()=> dpadDirection(`left`)
      },
      ArrowRight: {
        down: ()=> dpadDirection(`right`, `pressed`),
        up: ()=> dpadDirection(`right`)
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <PointerCommands {...this.dpadEvents}>
          <DpadView className={this.props.className} />
        </PointerCommands>

        <KeyCommands>
          {this.keyEvents}
        </KeyCommands>
      </React.Fragment>
    );
  }
}

Dpad.propTypes = { className: PropTypes.string };
