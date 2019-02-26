import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { SettingsRounded as SettingsIcon } from "@material-ui/icons";

import SettingsShowOverlay from "../Settings/SettingsShowOverlay";
import Link from "../Link/Link";
import { appContext } from "../Context/Context";
import * as firstUseActions from "../actions/firstUseActions";

import { useFirstUseStyles } from "./FirstUseStyles";

const handleDone = action => e => {
  action(e);
};

const FirstUse = props => {
  const state = React.useContext(appContext);
  const classes = useFirstUseStyles();

  return (
    <Dialog
      aria-labelledby="first-use"
      maxWidth="xs"
      open={state.settings.firstUse}
      scroll="body"
    >
      <DialogTitle id="first-use">{`Welcome`}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.bodyText}>
          {`
            The Atlantis emulator is made for all devices.
            Before continuing, please choose whether you want to use the touch control
            overlay (you can always change this in Settings
          `}
          <SettingsIcon className={classes.inlineIcon} />
          {`).`}
        </DialogContentText>
        <SettingsShowOverlay />

        <DialogContentText className={classes.bodyText}>
          {`
            On many platforms, you can add Atlantis to the homescreen.
            It isn't necessary, but you might like it better.
          `}
        </DialogContentText>
        <Link href="https://lifehacker.com/5809338/add-web-site-bookmarks-to-your-iphones-homescreen">
          {`iOS Safari`}
        </Link>
        <Link href="https://youtu.be/t8vjwzMQad8">{`Android Chrome`}</Link>
        <Link href="https://www.laptopmag.com/articles/pin-website-windows-10-start">
          {`Windows Edge`}
        </Link>
        <Link href="https://support.google.com/chromebook/answer/3113576">
          {`Chrome OS`}
        </Link>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDone(firstUseActions.firstUseComplete)}
        >
          {`Thanks`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(FirstUse, () => true);
