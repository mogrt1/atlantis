import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";

const breakpointValues = {
  xs: 0,
  sm: 350,
  md: 720,
  lg: 1280,
  xl: 1920
};

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: amber,
    type: `dark`
  },
  breakpoints: {
    keys: [`xs`, `sm`, `md`, `lg`, `xl`],
    up: key => `@media (min-width:${breakpointValues[key]}px)`
  }
});

export default theme;

export const gamepadButton = {
  position: `absolute`,
  width: `20vmin`,
  height: `20vmin`,
  borderRadius: `50%`,
  boxShadow: `
    inset -1px 1px 16px 0px rgba(128, 128, 128, 1),
    0 0 3px 1px rgba(128, 128, 128, 1)
  `,
  overflow: `hidden`,

  "& .Button-label": {
    position: `absolute`,
    bottom: `25%`,
    left: `25%`,
    fontSize: `5vmin`,
    color: `rgba(128, 128, 128, 0.5)`
  },
  "& sup": { fontFamily: `'Times New Roman', Times, serif` }
};

// Media queries.

export const landscape = `@media (orientation: landscape)`;

export const largeDisplay = `@media
  (orientation: portrait) and (min-width: 500px),
  (orientation: landscape) and (min-width: 1000px)
`;

export const stubby = `@media (orientation: portrait) and (min-aspect-ratio: 2/3)`;
