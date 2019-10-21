import { makeStyles } from "@material-ui/core/styles";

import theme from "../../theme";

const THUMB_WIDTH = 48;
const maxWidth = window.innerWidth - THUMB_WIDTH;
const nominalWidth = 320;
const settingsWidth = Math.min(nominalWidth, maxWidth);

const INDENT = 4,
  DEEP_INDENT = 6;

export const useSettingsStyles = makeStyles({
  open: {
    position: `absolute`,
    top: 0,
    left: 0,
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  drawer: {
    width: settingsWidth,
    maxWidth: `calc(100vw - ${THUMB_WIDTH}px)`
  },
  heading: {
    paddingTop: `env(safe-area-inset-top)`,
    background: theme.palette.background.paper
  }
});

const settingsItem = {
  paddingLeft: `max(24px, env(safe-area-inset-left))`,
  height: 72
};

export const useSettingsFFRateStyles = makeStyles({
  settingsItem,
  itemText: { paddingLeft: 0 },
  value: { color: theme.palette.getContrastText(theme.palette.primary[`800`]) }
});

export const useSettingsToggleStyles = makeStyles({
  settingsItem,
  itemText: { paddingLeft: 0 },
  toggleSwitch: { right: `-12px` },
  toggleSwitchChecked: { color: `${theme.palette.secondary[`800`]} !important` }
});

const collapsibleList = {
  itemText: { paddingLeft: 0 },
  nested: { paddingLeft: theme.spacing(INDENT) },
  expand: {
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  collapsibleList: {
    "& $nested": {
      paddingTop: 0,
      paddingBottom: 0,
      height: 48
    }
  }
};

export const useSettingsKeyBindingsStyles = makeStyles({
  settingsItem,
  ...collapsibleList,
  input: { width: `100%` },
  collapsibleList: {
    "& $nested": {
      paddingTop: 0,
      paddingBottom: 0,
      height: 64
    },
    "& $input": { margin: 0 }
  }
});

export const useSettingsManageDataStyles = makeStyles({
  settingsItem,
  ...collapsibleList,
  itemRoot: { padding: 0 },
  itemPrimary: {
    whiteSpace: `nowrap`,
    overflow: `hidden`,
    textOverflow: `ellipsis`
  },
  save: { paddingLeft: theme.spacing(DEEP_INDENT) },
  confirmBody: {
    lineHeight: 1.2,
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  confirmButton: { background: theme.palette.secondary[`800`] },
  secondaryAction: { color: `inherit` }
});
