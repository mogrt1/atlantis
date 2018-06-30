import { withStyles } from '@material-ui/core/styles';

import { landscape } from '../../theme';

const axis = {
  position: `absolute`,
  borderRadius: `10px`,
  boxShadow: `
    inset -1px 1px 16px 0px rgba(128, 128, 128, 1),
    0 0 3px 1px rgba(128, 128, 128, 1)
  `
};

export const dpadDim = {
  portrait: {
    bottom: {
      value: 9.3,
      unit: `vh`
    },
    left: {
      value: 5,
      unit: `vmin`
    },
    width: {
      value: 40,
      unit: `vmin`
    },
    height: {
      value: 40,
      unit: `vmin`
    },
    breadth: {
      value: 33,
      unit: `%`
    }
  }
};

dpadDim.landscape = {
  ...dpadDim.portrait,
  bottom: [
    {
      value: 50,
      unit: `vh`
    },
    {
      value: 20,
      unit: `vh`
    },
    {
      value: 5,
      unit: `vh`
    }
  ]
};

const getDim = (dim)=>
  `${dpadDim.portrait[dim].value}${dpadDim.portrait[dim].unit}`;

export const styleDpad = withStyles({
  dpad: {
    position: `absolute`,
    bottom: getDim(`bottom`),
    left: getDim(`left`),
    width: getDim(`width`),
    height: getDim(`height`),

    [landscape]: {
      bottom: `calc(${
        dpadDim.landscape.bottom.map(
          (dim)=> `${dim.value}${dim.unit}`
        ).join(` - `)
      })`
    }
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
