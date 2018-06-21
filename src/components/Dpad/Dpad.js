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

    this.dpadDirection = (direction, pressed)=> {
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
  }

  render() {
    const { kb } = this.props;

    this.keyEvents = {
      [kb[`settings-kb-up`]]: {
        down: ()=> this.dpadDirection(`up`, `pressed`),
        up: ()=> this.dpadDirection(`up`)
      },
      [kb[`settings-kb-down`]]: {
        down: ()=> this.dpadDirection(`down`, `pressed`),
        up: ()=> this.dpadDirection(`down`)
      },
      [kb[`settings-kb-left`]]: {
        down: ()=> this.dpadDirection(`left`, `pressed`),
        up: ()=> this.dpadDirection(`left`)
      },
      [kb[`settings-kb-right`]]: {
        down: ()=> this.dpadDirection(`right`, `pressed`),
        up: ()=> this.dpadDirection(`right`)
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
