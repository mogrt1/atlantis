import React from "react";
import PropTypes from "prop-types";

const ButtonView = ({
  pointerHandlers = {},
  children = ``,
  className = ``
}) => (
  <div className={`Button ${className}`} {...pointerHandlers}>
    <div className="Button-label">{children}</div>
  </div>
);

ButtonView.propTypes = {
  pointerHandlers: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.node,
  className: PropTypes.string
};

export default ButtonView;
