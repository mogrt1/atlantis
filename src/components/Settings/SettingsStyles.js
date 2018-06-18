import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

const INDENT = 4;

export const styleSettings = withStyles({
  open: {
    position: `absolute`,
    top: 0,
    left: 0,
    color: theme.palette.getContrastText(theme.palette.grey[`800`])
  },
  drawer: { width: 270 },
  heading: { background: theme.palette.background.paper }
});

export const styleSettingsFFRate = withStyles({ select: { width: `100%` } });

export const styleSettingsKeyBindings = withStyles({
  sectionHeading: { paddingLeft: 0 },
  nested: { paddingLeft: theme.spacing.unit * INDENT }
});
