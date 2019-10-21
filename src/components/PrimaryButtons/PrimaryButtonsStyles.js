import { makeStyles } from "@material-ui/core/styles";

import { gamepadButton, landscape } from "../../theme";

export const usePrimaryButtonStyles = makeStyles({
  buttons: {
    position: `absolute`,
    right: `max(5vmin, env(safe-area-inset-right))`,
    bottom: `11.3vh`,
    width: `40vmin`,
    height: `30vmin`,

    fallbacks: { right: `5vmin` },

    [landscape]: { bottom: `28vh` }
  },
  b: {
    ...gamepadButton,
    bottom: 0,
    left: 0,
    pointerEvents: `none`
  },
  a: {
    ...gamepadButton,
    top: 0,
    right: 0,
    pointerEvents: `none`
  },
  ba: {
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%) rotate(-27deg)`,
    width: `8vmin`,
    height: `30vmin`
  }
});
