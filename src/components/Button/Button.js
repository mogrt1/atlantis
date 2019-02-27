import React from "react";
import PropTypes from "prop-types";

import usePointerHandlers from "../hooks/usePointerHandlers";
import useKeyHandlers from "../hooks/useKeyHandlers";
import { appContext } from "../Context/Context";

import ButtonView from "./ButtonView";

const Button = ({
  children = ``,
  keyCommands = {},
  className = ``,
  pointerCommands
}) => {
  const state = React.useContext(appContext);

  const pointerHandlers = usePointerHandlers(pointerCommands);

  useKeyHandlers(keyCommands, !state.settingsOpen && keyCommands);

  return (
    <ButtonView className={className} pointerHandlers={pointerHandlers}>
      {children}
    </ButtonView>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  pointerCommands: PropTypes.objectOf(PropTypes.func).isRequired,
  keyCommands: PropTypes.objectOf(PropTypes.object),
  className: PropTypes.string
};

export default Button;
