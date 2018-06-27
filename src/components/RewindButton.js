import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

import { gameboy, GameBoyEmulatorPlaying as gameBoyEmulatorPlaying, autoSave, pause, run } from '../cores/GameBoy-Online/js/index';

export default class RewindButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    const BACKUPS = 60,
          BACKUP_INTERVAL = 1000;

    this.recordTimeout = null;

    this.record = ()=> {
      if(!gameBoyEmulatorPlaying()) {
        this.recordTimeout = setTimeout(this.record, BACKUP_INTERVAL);
        return;
      }

      this.props.rewindQueue.push(
        autoSave().state
      );

      while(this.props.rewindQueue.length > BACKUPS) {
        this.props.rewindQueue.shift();
      }

      this.recordTimeout = setTimeout(this.record, BACKUP_INTERVAL);
    };

    let rewindTimeout = null;
    const REWIND_INTERVAL = 333;

    this.rewind = ()=> {
      if(this.props.rewindQueue.length) {
        gameboy.returnFromState(this.props.rewindQueue.pop());
        gameboy.run(`force`);
        gameboy.stopEmulator = 3;

        rewindTimeout = setTimeout(this.rewind, REWIND_INTERVAL);
      } else {
        clearTimeout(rewindTimeout);
        run();
      }
    };

    this.events = {
      down: ()=> {
        pause();
        rewindTimeout = setTimeout(this.rewind, REWIND_INTERVAL);
      },
      up: ()=> {
        clearTimeout(rewindTimeout);

        if(!gameBoyEmulatorPlaying()) {
          run();
        }
      }
    };
  }

  componentDidMount() {
    const BACKUP_INTERVAL = 1000;
    this.recordTimeout = setTimeout(this.record, BACKUP_INTERVAL);
  }

  componentWillUnmount() {
    clearTimeout(this.recordTimeout);
  }

  render() {
    return (
      <Button
        className={this.props.className}
        pointerCommands={this.events}
        keyCommands={{ [this.props.kb]: this.events }}
      >
        {this.props.children}
      </Button>
    );
  }
}

RewindButton.propTypes = {
  kb: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  rewindQueue: PropTypes.array.isRequired
};
