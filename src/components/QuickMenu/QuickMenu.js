import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/core";
import {
  OpenInBrowser as OpenInBrowserIcon,
  SaveAlt as SaveIcon,
  VideogameAsset as VideogameAssetIcon,
  Autorenew as AutorenewIcon,
  AccessTime as AccessTimeIcon
} from "@material-ui/icons";

import Button from "../Button/Button";
import useKeyHandlers from "../hooks/useKeyHandlers";
import InternalClock from "../InternalClock/InternalClock";
import { appContext } from "../Context/Context";
import * as quickMenuActions from "../actions/quickMenuActions";
import {
  gameboy,
  GameBoyEmulatorPlaying as gameBoyEmulatorPlaying
} from "../../cores/GameBoy-Online/index";

import QuickMenuItem from "./QuickMenuItem";

const QuickMenu = ({ children = null, className = `` }) => {
  const state = React.useContext(appContext);
  const [anchor, setAnchor] = React.useState(null);
  const [openClock, setOpenClock] = React.useState(false);

  const { keyBindings } = state.settings;

  useKeyHandlers(
    {
      [keyBindings[`settings-kb-save-state`]]: {
        up: quickMenuActions.saveState
      },
      [keyBindings[`settings-kb-load-state`]]: {
        up: quickMenuActions.loadState
      },
      [keyBindings[`settings-kb-abss`]]: {
        up: quickMenuActions.abss
      },
      [keyBindings[`settings-kb-reset`]]: {
        up: quickMenuActions.reset
      }
    },
    gameBoyEmulatorPlaying
  );

  const events = {
    up: e => {
      setAnchor(e.currentTarget);
    }
  };

  const menuAction = action => () => {
    action();
    handleClose();
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const clockOpen = () => {
    setOpenClock(true);
  };

  const clockClose = () => {
    setOpenClock(false);
  };

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-owns={anchor ? `quick-menu` : null}
        className={className}
        pointerCommands={events}
      >
        {children}
      </Button>

      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: `top`,
          horizontal: `center`
        }}
        id="quick-menu"
        open={Boolean(anchor)}
        transformOrigin={{
          vertical: `top`,
          horizontal: `center`
        }}
        onClose={handleClose}
      >
        <QuickMenuItem
          icon={<SaveIcon />}
          label="Save State"
          onClick={menuAction(quickMenuActions.saveState)}
        />
        <QuickMenuItem
          icon={<OpenInBrowserIcon />}
          label="Load State"
          onClick={menuAction(quickMenuActions.loadState)}
        />
        {gameboy && gameboy.cTIMER && (
          <QuickMenuItem
            icon={<AccessTimeIcon />}
            label="Change Internal Clock"
            onClick={menuAction(clockOpen)}
          />
        )}
        <QuickMenuItem
          icon={<VideogameAssetIcon />}
          label="A+B+Start+Select"
          onClick={menuAction(quickMenuActions.abss)}
        />
        <QuickMenuItem
          icon={<AutorenewIcon />}
          label="Reset"
          onClick={menuAction(quickMenuActions.reset)}
        />
      </Menu>

      {gameboy && gameboy.cTIMER && (
        <InternalClock handleDone={clockClose} open={openClock} />
      )}
    </>
  );
};

QuickMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default QuickMenu;
