import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const ButtonView = (props)=> (
  <div
    className={`Button ${props.className}`}
    {...props.pointerEvents}
  >
    <div className="Button-label">{props.children}</div>
  </div>
);

ButtonView.propTypes = {
  pointerEvents: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string
};

export default pure(ButtonView);
