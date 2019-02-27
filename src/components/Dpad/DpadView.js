import React from "react";
import PropTypes from "prop-types";

import { useDpadStyles } from "./DpadStyles";

const DpadView = ({ pointerHandlers = {}, className = ``, dpadRef }) => {
  const classes = useDpadStyles();

  return (
    <div
      ref={dpadRef}
      className={`${classes.dpad} ${className || ``}`}
      {...pointerHandlers}
    >
      <div className={classes.vertical} />
      <div className={classes.horizontal} />
    </div>
  );
};

DpadView.propTypes = {
  dpadRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pointerHandlers: PropTypes.objectOf(PropTypes.func),
  className: PropTypes.string
};

export default DpadView;
