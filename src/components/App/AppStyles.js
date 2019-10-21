import { makeStyles } from "@material-ui/core/styles";

export const useAppStyles = makeStyles({
  "@global": {
    html: {
      touchCallout: `none`,
      tapHighlightColor: `transparent`,
      userSelect: `none`
    },

    body: {
      fontFamily: `sans-serif`,
      overflow: `hidden`
    },

    "#root": {
      position: `relative`,
      top: `env(safe-area-inset-top)`,
      width: `100vw`,
      height: `calc(100vh - env(safe-area-inset-top))`,
      overflow: `hidden`,

      fallbacks: { height: `100vh` }
    },

    svg: { pointerEvents: `none` }
  }
});
