import { action } from "../Context/Context";

export const setCanvas = action(`SET_CANVAS`, (state, dispatch, canvas) => {
  dispatch({ canvas });
});
