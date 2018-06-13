import React from 'react';
import PropTypes from 'prop-types';

import DpadView from './DpadView';
import './Dpad.css';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

export default class Dpad extends React.Component {
  constructor(props) {
    super(props);

    this.dpadEvents = {
      down: (e)=> e,
      move: (e)=> e,
      up: (e)=> e
    };

    this.keyEvents = { ';': this.dpadEvents };
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
