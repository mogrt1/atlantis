import React from "react";

import { useSettingsStyles } from "./SettingsStyles";

import { IconButton, Drawer, List, ListSubheader } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/SettingsRounded";

import SettingsMute from "./SettingsMute";
import SettingsHaptics from "./SettingsHaptics";
import SettingsFFRate from "./SettingsFFRate";
import SettingsFFToggle from "./SettingsFFToggle";
import SettingsRewind from "./SettingsRewind";
import SettingsManageData from "./SettingsManageData";
import SettingsShowOverlay from "./SettingsShowOverlay";
import SettingsKeyBindings from "./SettingsKeyBindings";
import Link from "../Link/Link";

import { appContext } from "../Context/Context";
import * as appActions from "../actions/appActions";
import * as settingsActions from "../actions/settingsActions";

const Settings = props => {
  const state = React.useContext(appContext);
  const classes = useSettingsStyles();

  return (
    <>
      <IconButton
        aria-label="open settings"
        className={classes.open}
        color="inherit"
        onClick={appActions.toggleDrawer(`settings`)}
      >
        <SettingsIcon />
      </IconButton>

      <Drawer
        onClose={appActions.toggleDrawer(`settings`)}
        open={state.settingsOpen}
      >
        <List
          className={classes.drawer}
          role="button"
          subheader={
            <ListSubheader className={classes.heading}>
              {`Settings`}
            </ListSubheader>
          }
          tabIndex={0}
        >
          <SettingsMute />
          {`vibrate` in window.navigator && <SettingsHaptics />}
          <SettingsFFRate
            rate={state.settings.ffRate}
            updateSetting={settingsActions.updateSetting(`ffRate`)}
          />
          <SettingsFFToggle />
          <SettingsRewind />
          <SettingsManageData
            deleteGame={settingsActions.deleteGame}
            deleteSaveState={settingsActions.deleteSaveState}
            deleteSRAM={settingsActions.deleteSRAM}
            library={state.library}
          />
          <SettingsShowOverlay />
          <SettingsKeyBindings
            keyBindings={state.settings.keyBindings}
            updateSetting={settingsActions.updateSetting(`keyBindings`)}
          />
          <Link
            error
            href="https://github.com/brianblakely/atlantis/issues/new?template=bug-report.md"
          >
            {`Report a Bug`}
          </Link>
        </List>
      </Drawer>
    </>
  );
};

export default React.memo(Settings, () => true);
