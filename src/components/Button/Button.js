import React from 'react';
import PropTypes from 'prop-types';

import ButtonView from './ButtonView';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

export default class Button extends React.Component {
  render() {
    return (
      <Consumer>
        {({ state })=> (
          <React.Fragment>
            <PointerCommands {...this.props.pointerCommands}>
              <ButtonView className={this.props.className}>
                {this.props.children}
              </ButtonView>
            </PointerCommands>

            {
              !state.settingsOpen && this.props.keyCommands
              && <KeyCommands>
                {this.props.keyCommands}
              </KeyCommands>
            }
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  pointerCommands: PropTypes.object.isRequired,
  keyCommands: PropTypes.object,
  className: PropTypes.string
};
