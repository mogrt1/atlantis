import { makeStyles } from "@material-ui/styles";

import theme from "../../theme";

export const useLinkStyles = makeStyles({
  link: { height: 48 },
  textRoot: { paddingLeft: 0 },
  error: {
    color: theme.palette.secondary[`800`],
    "& *": { color: theme.palette.secondary[`800`] }
  }
});
