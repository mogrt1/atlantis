import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import {
  gameboy,
  GameBoyEmulatorPlaying as gameBoyEmulatorPlaying
} from "../../cores/GameBoy-Online/index";

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

const FastForwardButton = ({
  toggle,
  rate,
  kb,
  className = ``,
  children = null
}) => {
  const events = useToggleEvents({ toggle, rate });

  return (
    <Button
      className={className}
      keyCommands={{
        [kb]: events
      }}
      pointerCommands={events}
    >
      {children}
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

export default FastForwardButton;
