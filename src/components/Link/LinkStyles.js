import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

export const styleLink = withStyles({
  link: { height: 48 },
  textRoot: { paddingLeft: 0 },
  error: {
    color: theme.palette.secondary[`800`],
    '& *': { color: theme.palette.secondary[`800`] }
  }
});
