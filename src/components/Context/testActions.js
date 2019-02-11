import { action } from "./Context";

export const testAction = action(`TEST_ACTION`, (state, dispatch, input) => {
  console.log(`this was given as input:`, input);
  console.log(`this is the app state:`, state);
  console.log(`here is your dispatch function:`, dispatch);

  dispatch({
    ...state,
    test: input
  });
});
