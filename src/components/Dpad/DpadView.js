import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { styleDpad } from './DpadStyles';

const DpadView = (props)=> {
  const { classes } = props;

  return (
    <div
      className={`${classes.dpad} ${props.className || ``}`}
      {...props.pointerEvents}
    >
      <div className={classes.vertical}></div>
      <div className={classes.horizontal}></div>
    </div>
  );
};

DpadView.propTypes = {
  pointerEvents: PropTypes.object,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default pure(styleDpad(DpadView));
