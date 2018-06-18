import theme from '../../theme';
import gameboyCart from './images/gameboy.svg';

export const libraryWidth = 270;
export const libraryCols = 2;
export const drawer = { width: libraryWidth };
export const libraryList = { width: libraryWidth + libraryCols };

export const open = {
  position: `absolute`,
  top: 0,
  right: 0,
  color: theme.palette.getContrastText(theme.palette.grey[`800`])
};

export const heading = { background: theme.palette.background.paper };

export const addGameLabel = {
  position: `absolute`,
  top: 0,
  left: 0,
  width: `100%`,
  height: `100%`,
  cursor: `pointer`
};

export const game = {
  width: `${libraryWidth / libraryCols}px`,
  height: `${libraryWidth / libraryCols}px`
};
export const gameImage = { width: `${libraryWidth / libraryCols}px` };
export const gameImageError = {
  width: `${libraryWidth / libraryCols}px`,
  height: `${libraryWidth / libraryCols}px`,
  background: `url(${gameboyCart}) 50% 50% no-repeat ${theme.palette.primary.light}`,
  backgroundSize: `50%`
};

export const gameTitle = {
  root: { pointerEvents: `none` },
  title: { fontSize: `0.75rem` }
};

export const gameTitleOverlay = { pointerEvents: `none` };
export const gameTitleWrap = {
  marginRight: `8px`,
  marginLeft: `8px`
};
export const gameTitleText = { fontSize: `0.75rem` };
