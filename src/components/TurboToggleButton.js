import React from "react";
import PropTypes from "prop-types";

import Button from "./Button/Button";

const TurboToggleButton = props => {
  const pressed = React.useRef(false);

  const events = {
    down: () => {
      if (pressed.current) {
        return false;
      }

      pressed.current = true;

      props.toggleTurbo();
    },
    up: () => {
      pressed.current = false;
    }
  };

  return (
    <Button className={props.className} pointerCommands={events}>
      {props.children}
    </Button>
  );
};

TurboToggleButton.propTypes = {
  toggleTurbo: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

TurboToggleButton.defaultProps = {
  className: ``,
  children: null
};

export default TurboToggleButton;
