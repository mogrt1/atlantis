import theme from '../../theme';

export const drawer = { width: 270 };

export const open = {
  position: `absolute`,
  top: 0,
  left: 0,
  color: theme.palette.getContrastText(theme.palette.grey[`800`])
};

export const heading = { background: theme.palette.background.paper };

export const sectionHeading = { paddingLeft: 0 };

export const select = { width: `100%` };

const INDENT = 4;
export const nested = { paddingLeft: theme.spacing.unit * INDENT };

