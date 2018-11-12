import React from "react";
import PropTypes from "prop-types";

import Button from "./Button/Button";

import {
  gameboy,
  GameBoyEmulatorPlaying as gameBoyEmulatorPlaying
} from "../cores/GameBoy-Online/index";

const NORMAL = 1;

const useToggleEvents = ({ toggle, rate }) => {
  const fastforward = React.useRef(false);
  const pressed = React.useRef(false);

  const toggleEvents = {
    down: () => {
      if (pressed.current) {
        return false;
      }

      pressed.current = true;

      if (gameBoyEmulatorPlaying()) {
        fastforward.current = !fastforward.current;

        gameboy.setSpeed(fastforward.current ? rate : NORMAL);
      }
    },
    up: () => {
      pressed.current = false;
    }
  };

  const noToggleEvents = {
    down: () => {
      if (gameBoyEmulatorPlaying()) {
        gameboy.setSpeed(rate);
      }
    },
    up: () => {
      if (gameBoyEmulatorPlaying()) {
        gameboy.setSpeed(NORMAL);
      }
    }
  };

  return toggle ? toggleEvents : noToggleEvents;
};

const FastForwardButton = props => {
  const events = useToggleEvents(props);

  return (
    <Button
      className={props.className}
      keyCommands={{
        [props.kb]: events
      }}
      pointerCommands={events}
    >
      {props.children}
    </Button>
  );
};

FastForwardButton.propTypes = {
  toggle: PropTypes.bool.isRequired,
  rate: PropTypes.number.isRequired,
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

FastForwardButton.defaultProps = {
  className: ``,
  children: null
};

export default FastForwardButton;
