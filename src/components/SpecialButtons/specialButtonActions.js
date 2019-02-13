import { action } from "../Context/Context";

export const toggleTurbo = action(`TOGGLE_TURBO`, (state, dispatch) => {
  const newTurbo = !state.turbo;

  dispatch({ turbo: newTurbo });
});
