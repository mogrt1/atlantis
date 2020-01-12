import { makeStyles } from "@material-ui/core/styles";

import { gamepadButton, landscape, largeDisplay, stubby } from "../../theme";

const rounded = { borderRadius: `25%` },
  secondary = {
    ...gamepadButton,
    width: `15vmin`,
    height: `5vmin`,
    overflow: `visible`,

    "& .Button-label": {
      ...gamepadButton[`& .Button-label`],
      left: 0,
      bottom: `-120%`,
      width: `100%`,
      textAlign: `center`,

      [landscape]: {
        top: 0,
        bottom: `auto`,
        lineHeight: `5vmin`,
        fontSize: `3vmin`
      }
    },

    [landscape]: { transform: `rotate(-40deg)` }
  },
  option = {
    ...gamepadButton,
    ...rounded,
    bottom: `32.3vh`,
    width: `14vmin`,
    height: `10vmin`,

    "& .Button-label": {
      ...gamepadButton[`& .Button-label`],
      bottom: `5%`,
      left: `10%`
    },

    [landscape]: {
      top: 0,
      bottom: `auto`
    },
    [largeDisplay]: { [stubby]: { bottom: `35vh` } }
  };

export const useGamepadStyles = makeStyles({
  gamepad: {
    position: `fixed`,
    top: `calc(48px + 90vw + env(safe-area-inset-top))`,
    left: 0,
    width: `100vw`,
    height: `calc(100% - 90vw - 48px - env(safe-area-inset-top))`,
    zIndex: 1,

    fallbacks: {
      top: `calc(48px + 90vw)`,
      height: `calc(100% - 90vw - 48px)`
    },

    [landscape]: {
      top: `calc(48px + 1vh)`,
      height: `calc(100% - 48px - 1vh)`
    },
    [largeDisplay]: {
      transform: `scale(0.5)`,
      transformOrigin: `100% 50%`,

      [stubby]: {
        height: `calc(100% - 90vw - env(safe-area-inset-top))`,

        fallbacks: { height: `calc(100% - 90vw)` }
      }
    }
  },
  hide: {
    opacity: 0,
    pointerEvents: `none`
  },
  start: {
    ...secondary,
    right: `30vw`,
    bottom: `5vh`,

    [landscape]: {
      ...secondary[landscape],
      right: `max(5vmin, env(safe-area-inset-right))`,
      bottom: `25vh`,

      fallbacks: { right: `5vmin` }
    }
  },
  select: {
    ...secondary,
    bottom: `5vh`,
    left: `30vw`,

    [landscape]: {
      ...secondary[landscape],
      right: `max(14vmin, calc(9vmin + env(safe-area-inset-right)))`,
      bottom: `10vh`,
      left: `auto`,

      fallbacks: { right: `14vmin` }
    }
  },
  icon: { fontSize: `5vmin` },
  rewind: {
    ...option,
    right: `max(24vmin, calc(19vmin + env(safe-area-inset-right)))`,

    fallbacks: { right: `24vmin` }
  },
  fastForward: {
    ...option,
    right: `max(5vmin, env(safe-area-inset-right))`,

    fallbacks: { right: `5vmin` }
  },
  quickMenu: {
    ...option,
    right: `calc(50vw - 7vw)`,

    [landscape]: {
      ...option[landscape],
      top: 0,
      right: `auto`,
      left: `max(5vmin, env(safe-area-inset-right))`,

      fallbacks: { left: `5vmin` },

      [largeDisplay]: {
        left: `calc(-100% + max(5vmin, env(safe-area-inset-right)))`,

        fallbacks: { left: `calc(-100% + 5vmin)` }
      }
    }
  },
  turbo: {
    ...gamepadButton,
    boxSizing: `content-box`,
    right: `-0.75vmin`,
    bottom: `-0.75vmin`,
    width: `max(10vmin, env(safe-area-inset-bottom))`,
    height: `max(10vmin, env(safe-area-inset-bottom))`,
    borderRadius: `1.5vmin`,

    fallbacks: {
      width: `10vmin`,
      height: `10vmin`
    },

    "& .Button-label": {
      ...gamepadButton[`& .Button-label`],
      bottom: `30%`,
      left: `15%`
    }
  }
});
