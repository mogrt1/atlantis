import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

export const styleQuickMenu = withStyles({
  snackbar: {
    paddingTop: `env(safe-area-inset-top)`,
    height: `calc(48px + env(safe-area-inset-top))`,
    width: `75vw`,
    maxWidth: `360px`,
    color: theme.palette.getContrastText(theme.palette.primary[`800`]),
    background: theme.palette.background.paper,

    fallbacks: {
      paddingTop: 6,
      height: 48
    }
  }
});
