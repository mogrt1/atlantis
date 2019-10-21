import { makeStyles } from "@material-ui/core/styles";

import { landscape } from "../../theme";

export const useEmulatorStyles = makeStyles({
  canvas: {
    position: `absolute`,
    top: `48px`,
    left: `0`,
    width: `100vw`,
    height: `90vw`,
    background: `linear-gradient(to right, #ffff00 0%,#ff6d00 100%);`,
    zIndex: `0`,

    [landscape]: {
      top: `0`,
      left: `calc(50% - 111.111111vh / 2)`,
      width: `111.111111vh`,
      height: `100vh`
    }
  }
});
