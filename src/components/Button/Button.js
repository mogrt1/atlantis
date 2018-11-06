import React from 'react';
import PropTypes from 'prop-types';

import ButtonView from './ButtonView';
import PointerCommands from '../PointerCommands';
import KeyCommands from '../KeyCommands';

import { appContext } from '../Context/Context';

const Button = (props)=> {
  const { state } = React.useContext(appContext);

  return (
    <>
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
    </>
  );
};

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
