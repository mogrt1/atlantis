import React from 'react';
import PropTypes from 'prop-types';

import ButtonView from './ButtonView';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { Consumer } from '../Context';

const Button = (props)=> (
  <Consumer>
    {({ state })=> (
      <React.Fragment>
        <PointerCommands {...props.pointerCommands}>
          <ButtonView className={props.className}>
            {props.children}
          </ButtonView>
        </PointerCommands>

        {
          !state.settingsOpen && props.keyCommands
              && <KeyCommands>
                {props.keyCommands}
              </KeyCommands>
        }
      </React.Fragment>
    )}
  </Consumer>
);

Button.propTypes = {
  children: PropTypes.node,
  pointerCommands: PropTypes.objectOf(PropTypes.func).isRequired,
  keyCommands: PropTypes.objectOf(PropTypes.object),
  className: PropTypes.string
};

Button.defaultProps = {
  children: ``,
  keyCommands: {},
  className: ``
};

export default Button;
