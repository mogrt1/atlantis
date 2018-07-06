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
import PrimaryButtons from '../PrimaryButtons/PrimaryButtons';

const GamepadView = (props)=> {
  const { classes } = props;

  return (
    <Consumer>
      {({ state, actions })=> {
        const { ffToggle, ffRate, keyBindings } = state.settings;

        return (
          <div className={`${classes.gamepad} ${(!state.settings.showOverlay && classes.hide) || ``}`}>
            <Dpad
              kb={keyBindings}
              haptics={state.settings.haptics}
            />

            <PrimaryButtons
              kbB={keyBindings[`settings-kb-b`]}
              kbA={keyBindings[`settings-kb-a`]}
              turboKbB={keyBindings[`settings-kb-b-turbo`]}
              turboKbA={keyBindings[`settings-kb-a-turbo`]}
              haptics={state.settings.haptics}
            />

            <GamepadButton
              className={classes.start}
              type="START"
              kb={keyBindings[`settings-kb-start`]}
              haptics={state.settings.haptics}
            >
              {`Start`}
            </GamepadButton>
            <GamepadButton
              className={classes.select}
              type="SELECT"
              kb={keyBindings[`settings-kb-select`]}
              haptics={state.settings.haptics}
            >
              {`Select`}
            </GamepadButton>

            {state.settings.enableRewind && state.currentROM.length && <RewindButton
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

            {state.currentROM.length && <QuickMenu className={classes.quickMenu} kb="q">
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
