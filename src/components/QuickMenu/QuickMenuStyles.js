import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

export const styleQuickMenu = withStyles({
  snackbar: {
    width: `75vw`,
    maxWidth: `360px`,
    color: theme.palette.getContrastText(theme.palette.primary[`800`]),
    background: theme.palette.background.paper
  }
});
