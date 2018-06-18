import { withStyles } from '@material-ui/core/styles';

import theme from '../../theme';

import gameboyCart from './images/gameboy.svg';

export const libraryWidth = 270;
export const libraryCols = 2;

export const styleLibrary = withStyles({
  open: {
    position: `absolute`,
    top: 0,
    right: 0,
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  drawer: { width: libraryWidth },
  heading: { background: theme.palette.background.paper }
});

export const styleGameList = withStyles({ libraryList: { width: libraryWidth + libraryCols } });

export const styleAddGame = withStyles({
  addGameLabel: {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`,
    cursor: `pointer`
  }
});

export const styleGame = withStyles({
  game: {
    width: `${libraryWidth / libraryCols}px`,
    height: `${libraryWidth / libraryCols}px`
  },
  gameImage: { width: `${libraryWidth / libraryCols}px` },
  gameImageError: {
    width: `${libraryWidth / libraryCols}px`,
    height: `${libraryWidth / libraryCols}px`,
    background: `url(${gameboyCart}) 50% 50% no-repeat ${theme.palette.primary.light}`,
    backgroundSize: `50%`
  },
  gameTitleRoot: { pointerEvents: `none` },
  gameTitleWrap: {
    marginRight: `8px`,
    marginLeft: `8px`
  },
  gameTitleText: { fontSize: `0.75rem` }
});
