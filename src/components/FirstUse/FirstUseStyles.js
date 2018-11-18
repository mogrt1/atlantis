import { makeStyles } from "@material-ui/styles";

import theme from "../../theme";

export const useFirstUseStyles = makeStyles({
  bodyText: { lineHeight: 1.2 },
  inlineIcon: { verticalAlign: `middle` },
  button: { background: theme.palette.secondary[`800`] }
});
