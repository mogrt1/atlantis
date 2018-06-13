import React from 'react';
import PropTypes from 'prop-types';

import ButtonView from './ButtonView';
import './Button.css';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

export default class Button extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PointerCommands {...this.props.pointerCommands}>
          <ButtonView className={this.props.className}>
            {this.props.children}
          </ButtonView>
        </PointerCommands>
        <KeyCommands>
          {this.props.keyCommands}
        </KeyCommands>
      </React.Fragment>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  pointerCommands: PropTypes.object.isRequired,
  keyCommands: PropTypes.object.isRequired,
  className: PropTypes.string
};
