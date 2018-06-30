import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import RewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import MenuIcon from '@material-ui/icons/Menu';

import { styleGamepad } from './GamepadStyles';

import Dpad from '../Dpad/Dpad';
import GamepadButton from '../GamepadButton';
import RewindButton from '../RewindButton';
import FastForwardButton from '../FastForwardButton';
import QuickMenu from '../QuickMenu/QuickMenu';
import TurboToggleButton from '../TurboToggleButton';

import { Consumer } from '../Context';

const GamepadView = (props)=> {
  const { classes } = props;

  return (
    <Consumer>
      {({ state, actions })=> {
        const { ffToggle, ffRate, keyBindings } = state.settings;

        return (
          <div className={`${classes.gamepad} ${(!state.settings.showOverlay && classes.hide) || ``}`}>
            <Dpad kb={keyBindings} />

            <GamepadButton
              className={classes.b}
              type="B"
              kb={keyBindings[`settings-kb-b`]}
              turbo={state.turbo}
              turboKb={keyBindings[`settings-kb-b-turbo`]}
            >
              {`B`}
            </GamepadButton>
            <GamepadButton
              className={classes.a}
              type="A"
              kb={keyBindings[`settings-kb-a`]}
              turbo={state.turbo}
              turboKb={keyBindings[`settings-kb-a-turbo`]}
            >
              {`A`}
            </GamepadButton>
            <GamepadButton className={classes.start} type="START" kb={keyBindings[`settings-kb-start`]}>
              {`Start`}
            </GamepadButton>
            <GamepadButton className={classes.select} type="SELECT" kb={keyBindings[`settings-kb-select`]}>
              {`Select`}
            </GamepadButton>

            {state.currentROM && <RewindButton
              className={classes.rewind}
              kb={keyBindings[`settings-kb-rw`]}
              rewindQueue={state.rewindQueue}
            >
              <RewindIcon className={classes.icon} />
            </RewindButton>}

            <FastForwardButton
              className={classes.fastForward}
              kb={keyBindings[`settings-kb-ff`]}
              toggle={ffToggle === false ? ffToggle : true}
              rate={ffRate}
            >
              <FastForwardIcon className={classes.icon} />
            </FastForwardButton>

            {state.currentROM && <QuickMenu className={classes.quickMenu} kb="q">
              <MenuIcon className={classes.icon} />
            </QuickMenu>}

            <TurboToggleButton className={classes.turbo} toggleTurbo={actions.toggleTurbo}>
              <sup>{`τ`}</sup>
            </TurboToggleButton>
          </div>
        );
      }}
    </Consumer>
  );
};

GamepadView.propTypes = { classes: PropTypes.object.isRequired };

export default pure(styleGamepad(GamepadView));
