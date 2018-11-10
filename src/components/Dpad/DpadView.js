import React from "react";
import PropTypes from "prop-types";
import { shouldUpdate } from "recompose";

import { styleDpad } from "./DpadStyles";

const DpadView = props => {
  const { classes } = props;

  return (
    <div
      ref={props.dpadRef}
      className={`${classes.dpad} ${props.className || ``}`}
      {...props.pointerHandlers}
    >
      <div className={classes.vertical} />
      <div className={classes.horizontal} />
    </div>
  );
};

DpadView.propTypes = {
  dpadRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pointerHandlers: PropTypes.objectOf(PropTypes.func),
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

DpadView.defaultProps = {
  pointerHandlers: {},
  className: ``
};

export default shouldUpdate(() => false)(styleDpad(DpadView));
