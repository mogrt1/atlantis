import React from "react";
import PropTypes from "prop-types";

import { useDpadStyles } from "./DpadStyles";

const DpadView = props => {
  const classes = useDpadStyles();

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

export default React.memo(DpadView, () => true);
