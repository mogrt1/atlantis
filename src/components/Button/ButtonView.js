import React from 'react';
import PropTypes from 'prop-types';

const ButtonView = (props)=> (
  <div
    className={`Button ${props.className}`}
    {...props.pointerHandlers}
  >
    <div className="Button-label">
      {props.children}
    </div>
  </div>
);

ButtonView.propTypes = {
  pointerHandlers: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.node,
  className: PropTypes.string
};

ButtonView.defaultProps = {
  pointerHandlers: {},
  children: ``,
  className: ``
};

export default ButtonView;
