import React from 'react';
import PropTypes from 'prop-types';

const ButtonView = (props)=> (
  <div
    className={`Button ${props.className}`}
    {...props.pointerEvents}
  >
    <div className="Button-label">
      {props.children}
    </div>
  </div>
);

ButtonView.propTypes = {
  pointerEvents: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.node,
  className: PropTypes.string
};

ButtonView.defaultProps = {
  pointerEvents: {},
  children: ``,
  className: ``
};

export default ButtonView;
