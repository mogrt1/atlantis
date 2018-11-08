import React from 'react';
import PropTypes from 'prop-types';

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

import { appContext } from '../Context/Context';
import PrimaryButtons from '../PrimaryButtons/PrimaryButtons';

const GamepadView = (props)=> {
  const { state, actions } = React.useContext(appContext);
  const { classes } = props;

  const { ffToggle, ffRate, keyBindings } = state.settings;

  return (
    <div className={`${classes.gamepad} ${(!state.settings.showOverlay && classes.hide) || ``}`}>
      <Dpad
        haptics={state.settings.haptics}
        kb={keyBindings}
      />

      <PrimaryButtons
        haptics={state.settings.haptics}
        kbA={keyBindings[`settings-kb-a`]}
        kbB={keyBindings[`settings-kb-b`]}
        turboKbA={keyBindings[`settings-kb-a-turbo`]}
        turboKbB={keyBindings[`settings-kb-b-turbo`]}
      />

      <GamepadButton
        className={classes.start}
        haptics={state.settings.haptics}
        kb={keyBindings[`settings-kb-start`]}
        type="START"
      >
        {`Start`}
      </GamepadButton>
      <GamepadButton
        className={classes.select}
        haptics={state.settings.haptics}
        kb={keyBindings[`settings-kb-select`]}
        type="SELECT"
      >
        {`Select`}
      </GamepadButton>

      {state.settings.enableRewind && state.currentROM && <RewindButton
        className={classes.rewind}
        kb={keyBindings[`settings-kb-rw`]}
        rewindQueue={state.rewindQueue}
        showMessage={actions.showMessage}
      >
        <RewindIcon className={classes.icon} />
      </RewindButton>}

      <FastForwardButton
        className={classes.fastForward}
        kb={keyBindings[`settings-kb-ff`]}
        rate={ffRate}
        toggle={ffToggle === false ? ffToggle : true}
      >
        <FastForwardIcon className={classes.icon} />
      </FastForwardButton>

      {state.currentROM && <QuickMenu className={classes.quickMenu} kb="q">
        <MenuIcon className={classes.icon} />
      </QuickMenu>}

      <TurboToggleButton className={classes.turbo} toggleTurbo={actions.toggleTurbo}>
        <sup>
          {`τ`}
        </sup>
      </TurboToggleButton>
    </div>
  );
};

GamepadView.propTypes = { classes: PropTypes.objectOf(PropTypes.string).isRequired };

export default React.memo(styleGamepad(GamepadView), ()=> false);
