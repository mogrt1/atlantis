import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const DpadView = (props)=> (
  <div
    className="Dpad"

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
    <div className="Dpad-vertical"></div>
    <div className="Dpad-horizontal"></div>
  </div>
);

DpadView.propTypes = {
  down: PropTypes.func,
  move: PropTypes.func,
  up: PropTypes.func
};

export default pure(DpadView);
