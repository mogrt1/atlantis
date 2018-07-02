import { withStyles } from '@material-ui/core/styles';

import { landscape } from '../../theme';

const button = {
  position: `absolute`,
  overflow: `hidden`,
  boxShadow: `
    inset -1px 1px 16px 0px rgba(128, 128, 128, 1),
    0 0 3px 1px rgba(128, 128, 128, 1)
  `,

  '& .Button-label': {
    position: `absolute`,
    fontSize: `5vmin`,
    color: `rgba(128, 128, 128, 0.5)`,
    pointerEvents: `none`
  },
  '& sup': { fontFamily: `'Times New Roman', Times, serif` }
};

const round = { borderRadius: `50%` },
      rounded = { borderRadius: `25%` },
      primary = {
        ...round,
        ...button,
        width: `20vmin`,
        height: `20vmin`,

        '& .Button-label': {
          ...button[`& .Button-label`],
          bottom: `25%`,
          left: `25%`
        }
      },
      secondary = {
        ...round,
        ...button,
        width: `15vmin`,
        height: `5vmin`,
        overflow: `visible`,

        '& .Button-label': {
          ...button[`& .Button-label`],
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
        ...rounded,
        ...button,
        bottom: `32.3vh`,
        width: `14vmin`,
        height: `10vmin`,

        '& .Button-label': {
          ...button[`& .Button-label`],
          bottom: `5%`,
          left: `10%`
        },

        [landscape]: {
          top: 0,
          bottom: `auto`
        }
      };

export const styleGamepad = withStyles({
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
    }
  },
  hide: {
    opacity: 0,
    pointerEvents: `none`
  },
  b: {
    ...primary,
    right: `max(24vmin, calc(19vmin + env(safe-area-inset-right)))`,
    bottom: `11.3vh`,

    fallbacks: { right: `24vmin` },

    [landscape]: { bottom: `28vh` }
  },
  a: {
    ...primary,
    right: `max(5vmin, env(safe-area-inset-right))`,
    bottom: `18.3vh`,

    fallbacks: { right: `5vmin` },

    [landscape]: { bottom: `44vh` }
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

      fallbacks: { left: `5vmin` }
    }
  },
  turbo: {
    ...button,
    boxSizing: `content-box`,
    right: `-0.75vmin`,
    bottom: `-0.75vmin`,
    width: `max(10vmin, env(safe-area-inset-bottom))`,
    height: `max(10vmin, env(safe-area-inset-bottom))`,
    textIndent: `1.5vmin`,
    borderRadius: `1.5vmin`,

    fallbacks: {
      width: `10vmin`,
      height: `10vmin`
    }
  }
});
