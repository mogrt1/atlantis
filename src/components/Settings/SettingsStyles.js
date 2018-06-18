import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

const INDENT = 4;

export const styleSettings = withStyles({
  open: {
    position: `absolute`,
    top: 0,
    left: 0,
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  drawer: { width: 270 },
  heading: { background: theme.palette.background.paper }
});

export const styleSettingsFFRate = withStyles({
  select: { width: `100%` },
  itemText: { paddingLeft: 0 },
  toggleSwitch: { right: `-12px` },
  toggleSwitchChecked: { color: `${theme.palette.secondary[`800`]} !important` }
});

export const styleSettingsKeyBindings = withStyles({
  itemText: { paddingLeft: 0 },
  nested: { padding: `0 ${theme.spacing.unit * INDENT}px` },
  input: { width: `100%` },
  expand: { color: theme.palette.getContrastText(theme.palette.primary[`800`]) }
});
