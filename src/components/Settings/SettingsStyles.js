import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';


const THUMB_WIDTH = 48;
const maxWidth = window.innerWidth - THUMB_WIDTH;
const nominalWidth = 320;
const settingsWidth = Math.min(nominalWidth, maxWidth);

const INDENT = 4,
      DEEP_INDENT = 6;

export const styleSettings = withStyles({
  open: {
    position: `absolute`,
    top: 0,
    left: 0,
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  drawer: { width: settingsWidth },
  heading: { background: theme.palette.background.paper }
});

const settingsItem = { height: 72 };

export const styleSettingsFFRate = withStyles({
  settingsItem,
  select: { width: `100%` },
  itemText: { paddingLeft: 0 }
});

const toggle = {
  settingsItem,
  itemText: { paddingLeft: 0 },
  toggleSwitch: { right: `-12px` },
  toggleSwitchChecked: { color: `${theme.palette.secondary[`800`]} !important` }
};

export const styleSettingsFFToggle = withStyles(toggle);

export const styleSettingsShowOverlay = withStyles(toggle);

const collapsibleList = {
  itemText: { paddingLeft: 0 },
  nested: { paddingLeft: theme.spacing.unit * INDENT },
  expand: { color: theme.palette.getContrastText(theme.palette.primary[`800`]) },
  collapsibleList: {
    '& $nested': {
      paddingTop: 0,
      paddingBottom: 0,
      height: 48
    }
  }
};

export const styleSettingsKeyBindings = withStyles({
  settingsItem,
  ...collapsibleList,
  input: { width: `100%` },
  collapsibleList: {
    '& $nested': {
      paddingTop: 0,
      paddingBottom: 0,
      height: 64
    },
    '& $input': { margin: 0 }
  }
});

export const styleSettingsManageData = withStyles({
  settingsItem,
  ...collapsibleList,
  itemRoot: { padding: 0 },
  itemPrimary: {
    whiteSpace: `nowrap`,
    overflow: `hidden`,
    textOverflow: `ellipsis`
  },
  save: { paddingLeft: theme.spacing.unit * DEEP_INDENT }
});
