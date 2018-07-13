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
  },
  clock: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    padding: `6px max(6px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(6px, env(safe-area-inset-left))`,

    fallbacks: { padding: `6px` }
  },
  clockDone: { color: theme.palette.secondary[`800`] }
});
