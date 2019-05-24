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
  let recordTimeout = React.useRef(null);

  const record = React.useCallback(() => {
    if (!gameBoyEmulatorPlaying()) {
      recordTimeout.current = setTimeout(record, BACKUP_INTERVAL);
      return;
    }

    rewindQueue.push(autoSave().state);

    while (rewindQueue.length > BACKUPS) {
      rewindQueue.shift();
    }

    recordTimeout.current = setTimeout(record, BACKUP_INTERVAL);
  }, [rewindQueue]);

  React.useEffect(() => {
    recordTimeout.current = setTimeout(record, BACKUP_INTERVAL);

    return () => {
      clearTimeout(recordTimeout.current);
    };
  }, [record]);
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

const RewindButton = ({
  kb,
  className = ``,
  children = null,
  rewindQueue,
  showMessage
}) => {
  useRecording({ rewindQueue });
  const events = useRewindEvents({ rewindQueue, showMessage });

  return (
    <Button
      className={className}
      keyCommands={{ [kb]: events }}
      pointerCommands={events}
    >
      {children}
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

export default RewindButton;
