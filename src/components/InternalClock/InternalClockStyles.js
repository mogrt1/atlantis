import { makeStyles } from "@material-ui/core/styles";

import theme from "../../theme";

export const useInternalClockStyles = makeStyles({
  paper: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    padding: `6px max(6px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(6px, env(safe-area-inset-left))`,

    fallbacks: { padding: `6px` }
  },
  done: { color: theme.palette.secondary[`800`] }
});
