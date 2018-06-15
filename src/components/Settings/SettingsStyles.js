import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme();

export const drawer = { width: 300 };

export const open = {
  position: `absolute`,
  top: 0,
  left: 0
};

export const heading = { background: theme.palette.background.paper };

export const sectionHeading = { paddingLeft: 0 };

export const select = { width: `100%` };

const INDENT = 4;
export const nested = { paddingLeft: theme.spacing.unit * INDENT };

