import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { styleDpad } from './DpadStyles';

const DpadView = (props)=> {
  const { classes } = props;

  return (
    <div
      ref={props.dpadRef}
      className={`${classes.dpad} ${props.className || ``}`}
      {...props.pointerEvents}
    >
      <div className={classes.vertical}></div>
      <div className={classes.horizontal}></div>
    </div>
  );
};

DpadView.propTypes = {
  dpadRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pointerEvents: PropTypes.objectOf(PropTypes.func),
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

DpadView.defaultProps = {
  pointerEvents: {},
  className: ``
};

export default pure(styleDpad(DpadView));
