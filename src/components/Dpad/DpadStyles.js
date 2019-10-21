import { makeStyles } from "@material-ui/core/styles";

import { landscape, largeDisplay } from "../../theme";

const axis = {
  position: `absolute`,
  borderRadius: `10px`,
  boxShadow: `
    inset -1px 1px 16px 0px rgba(128, 128, 128, 1),
    0 0 3px 1px rgba(128, 128, 128, 1)
  `,
  pointerEvents: `none`
};

export const useDpadStyles = makeStyles({
  dpad: {
    position: `absolute`,
    bottom: `6.3vh`,
    left: `env(safe-area-inset-left)`,
    width: `50vmin`,
    height: `50vmin`,

    fallbacks: { left: `0` },

    [landscape]: { bottom: `calc(50vh - 25vh - 5vh)` },
    [largeDisplay]: {
      left: `calc(-100% + env(safe-area-inset-left))`,

      fallbacks: { left: `-100%` }
    }
  },
  vertical: {
    ...axis,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: `calc(40vmin * 0.33)`,
    height: `40vmin`
  },
  horizontal: {
    ...axis,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: `40vmin`,
    height: `calc(40vmin * 0.33)`
  }
});
