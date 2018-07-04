import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

export const styleFirstUse = withStyles({
  bodyText: { lineHeight: 1.2 },
  inlineIcon: { verticalAlign: `middle` },
  button: { background: theme.palette.secondary[`800`] }
});

export const styleLink = withStyles({
  link: { height: 48 },
  textRoot: { paddingLeft: 0 }
});
