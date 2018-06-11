import React from 'react';
import PropTypes from 'prop-types';

import DpadView from './DpadView';
import './Dpad.css';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

export default class Dpad extends React.Component {
  constructor(props) {
    super(props);

    const stop = (e)=> {
      e.stopPropagation();
      e.preventDefault();

      return true;
    };

    this.pointerEvents = {
      down: (e)=> stop(e) && console.log(`down`, e),
      move: (e)=> stop(e) && console.log(`move`, e),
      up: (e)=> stop(e) && console.log(`up`, e)
    };

    this.keyEvents = { ';': this.pointerEvents };
  }

  render() {
    return (
      <React.Fragment>
        <PointerCommands>
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
