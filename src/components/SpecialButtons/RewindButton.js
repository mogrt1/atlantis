import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import {
  gameboy,
  GameBoyEmulatorPlaying as gameBoyEmulatorPlaying,
  autoSave,
  pause,
  run
} from "../../cores/GameBoy-Online/index";

const BACKUPS = 1024;
const BACKUP_INTERVAL = 128;
const REWIND_INTERVAL = 16;

const useRecording = ({ rewindQueue }) => {
  let recordTimeout = null;

  const record = () => {
    if (!gameBoyEmulatorPlaying()) {
      recordTimeout = setTimeout(record, BACKUP_INTERVAL);
      return;
    }

    rewindQueue.push(autoSave().state);

    while (rewindQueue.length > BACKUPS) {
      rewindQueue.shift();
    }

    recordTimeout = setTimeout(record, BACKUP_INTERVAL);
  };

  React.useEffect(() => {
    recordTimeout = setTimeout(record, BACKUP_INTERVAL);

    return () => {
      clearTimeout(recordTimeout);
    };
  }, []);
};

const useRewindEvents = ({ rewindQueue, showMessage }) => {
  let rewindTimeout = null;

  const rewind = () => {
    if (rewindQueue.length) {
      gameboy.returnFromState(rewindQueue.pop(), `rewinding`);
      gameboy.run(`force`);
      gameboy.stopEmulator = 3;

      rewindTimeout = setTimeout(rewind, REWIND_INTERVAL);
    } else {
      clearTimeout(rewindTimeout);
      run();
      showMessage(`No more rewind history.`);
    }
  };

  const events = {
    down: () => {
      pause();
      rewindTimeout = setTimeout(rewind, REWIND_INTERVAL);
    },
    up: () => {
      clearTimeout(rewindTimeout);

      if (!gameBoyEmulatorPlaying()) {
        run();
      }
    }
  };

  return events;
};

const RewindButton = props => {
  useRecording(props);
  const events = useRewindEvents(props);

  return (
    <Button
      className={props.className}
      keyCommands={{ [props.kb]: events }}
      pointerCommands={events}
    >
      {props.children}
    </Button>
  );
};

RewindButton.propTypes = {
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  rewindQueue: PropTypes.arrayOf(PropTypes.array).isRequired,
  showMessage: PropTypes.func.isRequired
};

RewindButton.defaultProps = {
  className: ``,
  children: null
};

export default RewindButton;
