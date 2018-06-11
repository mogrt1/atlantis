import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const ButtonView = (props)=> (
  <div
    className={`Button ${props.className}`}

    onPointerDown={props.down}
    onTouchStart={props.down}
    onMouseDown={props.down}

    onPointerMove={props.move}
    onTouchMove={props.move}
    onMouseMove={props.move}

    onPointerUp={props.up}
    onTouchEnd={props.up}
    onMouseUp={props.up}

    onPointerCancel={props.up}
    onTouchCancel={props.up}
  >
    <div className="Button-label">{props.children}</div>
  </div>
);

ButtonView.propTypes = {
  down: PropTypes.func,
  move: PropTypes.func,
  up: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string
};

export default pure(ButtonView);
