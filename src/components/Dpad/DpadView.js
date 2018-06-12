import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const DpadView = (props)=> (
  <div
    className={`Dpad ${props.className || ``}`}
    {...props.pointerEvents}
  >
    <div className="Dpad-vertical"></div>
    <div className="Dpad-horizontal"></div>
  </div>
);

DpadView.propTypes = {
  pointerEvents: PropTypes.object,
  className: PropTypes.string
};

export default pure(DpadView);
