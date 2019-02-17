import React from "react";
import PropTypes from "prop-types";

import ButtonView from "./ButtonView";
import usePointerHandlers from "../hooks/usePointerHandlers";
import useKeyHandlers from "../hooks/useKeyHandlers";

import { appContext } from "../Context/Context";

const Button = props => {
  const state = React.useContext(appContext);

  const pointerHandlers = usePointerHandlers(props.pointerCommands);

  useKeyHandlers(props.keyCommands, !state.settingsOpen && props.keyCommands);

  return (
    <ButtonView className={props.className} pointerHandlers={pointerHandlers}>
      {props.children}
    </ButtonView>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  pointerCommands: PropTypes.objectOf(PropTypes.func).isRequired,
  keyCommands: PropTypes.objectOf(PropTypes.object),
  className: PropTypes.string
};

Button.defaultProps = {
  children: ``,
  keyCommands: {},
  className: ``
};

export default Button;
