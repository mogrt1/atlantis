import { withStyles } from '@material-ui/core/styles';

import { landscape } from '../../theme';

const button = {
  pointerEvents: `none`,
  position: `absolute`,
  width: `20vmin`,
  height: `20vmin`,
  borderRadius: `50%`,
  boxShadow: `
    inset -1px 1px 16px 0px rgba(128, 128, 128, 1),
    0 0 3px 1px rgba(128, 128, 128, 1)
  `,
  overflow: `hidden`,

  '& .Button-label': {
    position: `absolute`,
    bottom: `25%`,
    left: `25%`,
    fontSize: `5vmin`,
    color: `rgba(128, 128, 128, 0.5)`,
    pointerEvents: `none`
  },
  '& sup': { fontFamily: `'Times New Roman', Times, serif` }
};

export const stylePrimaryButtons = withStyles({
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
    ...button,
    bottom: 0,
    left: 0
  },
  a: {
    ...button,
    top: 0,
    right: 0
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
