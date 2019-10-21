import { makeStyles } from "@material-ui/core/styles";

import theme from "../../theme";

import gameboyCart from "./images/gameboy.svg";

const THUMB_WIDTH = 48;
const maxWidth = window.innerWidth - THUMB_WIDTH;
const nominalWidth = 320;
export const libraryWidth = Math.min(nominalWidth, maxWidth);
export const libraryCols = 2;

export const useLibraryStyles = makeStyles({
  open: {
    position: `absolute`,
    top: 0,
    right: 0,
    color: theme.palette.getContrastText(theme.palette.primary[`800`])
  },
  drawer: {
    width: libraryWidth,
    maxWidth: `calc(100vw - ${THUMB_WIDTH}px)`
  },
  heading: {
    paddingTop: `env(safe-area-inset-top)`,
    background: theme.palette.background.paper,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    height: `48px`,
    lineHeight: `1.2`
  },
  headingIcon: {
    margin: `0 0.5em 0 0`,
    verticalAlign: `middle`
  }
});

export const useGameListStyles = makeStyles({
  libraryList: {
    paddingRight: `env(safe-area-inset-right)`,
    width: libraryWidth
  }
});

export const useAddGameStyles = makeStyles({
  addGameLabel: {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`,
    cursor: `pointer`
  }
});

const tileDim = {
  width: `calc(${libraryWidth /
    libraryCols}px - env(safe-area-inset-right) / 2)`,
  height: `calc(${libraryWidth /
    libraryCols}px - env(safe-area-inset-right) / 2)`,

  fallbacks: {
    width: `${libraryWidth / libraryCols}px`,
    height: `${libraryWidth / libraryCols}px`
  }
};

export const useGameStyles = makeStyles({
  game: { ...tileDim },
  gameImage: { ...tileDim },
  gameImageError: {
    ...tileDim,
    background: `url(${gameboyCart}) 50% 50% no-repeat ${theme.palette.primary.light}`,
    backgroundSize: `50%`
  },
  gameTitleRoot: { pointerEvents: `none` },
  gameTitleWrap: {
    marginRight: `8px`,
    marginLeft: `8px`
  },
  gameTitleText: {
    whiteSpace: `normal`,
    lineHeight: `1`,
    fontSize: `0.75rem`
  }
});

export const useHomebrewStyles = makeStyles({
  heading: { background: theme.palette.background.paper }
});
