import { withStyles } from '@material-ui/core/styles';

import { landscape } from '../../theme';

const axis = {
  position: `absolute`,
  borderRadius: `10px`,
  boxShadow: `
    inset -1px 1px 16px 0px rgba(128, 128, 128, 1),
    0 0 3px 1px rgba(128, 128, 128, 1)
  `,
  pointerEvents: `none`
};

export const styleDpad = withStyles({
  dpad: {
    position: `absolute`,
    bottom: `9.3vh`,
    left: `max(5vmin, calc(1vmin + env(safe-area-inset-left)))`,
    width: `40vmin`,
    height: `40vmin`,

    fallbacks: { left: `5vmin` },

    [landscape]: { bottom: `calc(50vh - 20vh - 5vh)` }
  },
  vertical: {
    ...axis,
    top: 0,
    left: `calc(50% - 33% / 2)`,
    width: `33%`,
    height: `100%`
  },
  horizontal: {
    ...axis,
    top: `calc(50% - 33% / 2)`,
    left: `0`,
    width: `100%`,
    height: `33%`
  }
});
