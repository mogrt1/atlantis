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
import QuickMenuItem from "./QuickMenuItem";
import InternalClock from "../InternalClock/InternalClock";

import { gameboy } from "../../cores/GameBoy-Online/index";

import { appContext } from "../Context/Context";

const QuickMenu = props => {
  const { state, actions } = React.useContext(appContext);
  const [anchor, setAnchor] = React.useState(null);
  const [openClock, setOpenClock] = React.useState(false);

  const { keyBindings } = state.settings;

  useKeyHandlers({
    [keyBindings[`settings-kb-save-state`]]: {
      up: actions.saveState
    },
    [keyBindings[`settings-kb-load-state`]]: {
      up: actions.loadState
    },
    [keyBindings[`settings-kb-abss`]]: {
      up: actions.abss
    },
    [keyBindings[`settings-kb-reset`]]: {
      up: actions.reset
    }
  });

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
        className={props.className}
        pointerCommands={events}
      >
        {props.children}
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
          onClick={menuAction(actions.saveState)}
        />
        <QuickMenuItem
          icon={<OpenInBrowserIcon />}
          label="Load State"
          onClick={menuAction(actions.loadState)}
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
          onClick={menuAction(actions.abss)}
        />
        <QuickMenuItem
          icon={<AutorenewIcon />}
          label="Reset"
          onClick={menuAction(actions.reset)}
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

QuickMenu.defaultProps = {
  children: null,
  className: ``
};

export default QuickMenu;
