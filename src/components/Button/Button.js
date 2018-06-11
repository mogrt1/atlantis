import React from 'react';
import PropTypes from 'prop-types';

import ButtonView from './ButtonView';
import './Button.css';
import KeyCommands from '../KeyCommands';

export default class Button extends React.Component {
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
        <ButtonView {...this.pointerEvents} className={this.props.className} />
        <KeyCommands>
          {this.keyEvents}
        </KeyCommands>
      </React.Fragment>
    );
  }
}

Button.propTypes = { className: PropTypes.string };
