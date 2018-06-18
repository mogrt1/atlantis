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

export const sectionHeading = { paddingLeft: 0 };

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

export const gameTitle = { fontSize: `0.75rem` };
