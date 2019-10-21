import { makeStyles } from "@material-ui/core/styles";

import theme from "../../theme";

export const useNotificationStyles = makeStyles({
  snackbar: {
    right: `auto`,
    left: `50%`,
    width: `360px`,
    minWidth: `275px`,
    maxWidth: `calc(100vw - 48px * 2)`,
    transform: `translateX(-50%)`
  },
  content: {
    paddingTop: `env(safe-area-inset-top)`,
    height: `calc(48px + env(safe-area-inset-top))`,
    color: theme.palette.getContrastText(theme.palette.primary[`800`]),
    background: theme.palette.background.paper,

    fallbacks: {
      paddingTop: 6,
      height: 48
    }
  },
  button: { color: theme.palette.secondary[`800`] }
});
