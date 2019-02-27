import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import * as specialButtonActions from "../actions/specialButtonActions";

const TurboToggleButton = ({ className = ``, children = null }) => {
  const pressed = React.useRef(false);

  const events = {
    down: () => {
      if (pressed.current) {
        return false;
      }

      pressed.current = true;

      specialButtonActions.toggleTurbo();
    },
    up: () => {
      pressed.current = false;
    }
  };

  return (
    <Button className={className} pointerCommands={events}>
      {children}
    </Button>
  );
};

TurboToggleButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default TurboToggleButton;
